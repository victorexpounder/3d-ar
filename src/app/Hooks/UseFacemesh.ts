'use client';
import { useEffect, useState } from 'react';

interface NosePosition {
  x: number;
  y: number;
  z: number;
}

export const useMediaPipeFaceTracker = (
  videoRef: React.RefObject<HTMLVideoElement | null>
) => {
  const [position, setPosition] = useState<NosePosition | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrameId: number;

    const loadFaceMesh = async () => {
      if (typeof window === 'undefined') return;

      const { FaceMesh } = await import('@mediapipe/face_mesh');

      const faceMesh = new FaceMesh({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results: any) => {
        const landmarks = results.multiFaceLandmarks?.[0];
        if (landmarks && landmarks[6]) {
          const { x, y, z } = landmarks[6];
          setPosition({ x, y, z });
        }
      });

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();

          const renderLoop = async () => {
            if (!videoRef.current || videoRef.current.readyState < 2) {
              animationFrameId = requestAnimationFrame(renderLoop);
              return;
            }

            await faceMesh.send({ image: videoRef.current });
            animationFrameId = requestAnimationFrame(renderLoop);
          };

          renderLoop();
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    loadFaceMesh();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [videoRef]);

  return position;
};
