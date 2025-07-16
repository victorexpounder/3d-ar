'use client';
// hooks/useFaceTracker.ts
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceMesh from '@tensorflow-models/facemesh';

export function useFaceTracker(videoRef) {
  const modelRef = useRef<faceMesh.FaceMesh | null>(null);
  const [position, setPosition] = useState<Vector3 | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadModelAndTrack = async () => {
      await tf.setBackend('webgl');
      await tf.ready();

      modelRef.current = await faceMesh.load();

      const detect = async () => {
        if (videoRef.current && modelRef.current) {
          const predictions = await modelRef.current.estimateFaces({
            input: videoRef.current
          });

          if (predictions.length > 0) {
            const keypoints = predictions[0].scaledMesh;

            // Nose bridge index 6 (approximate center)
            const [x, y, z] = keypoints[6];
            setPosition({ x, y: -y, z }); // Flip Y axis for 3D scene
          }
        }
        requestAnimationFrame(detect);
      };

      detect();
    };

    loadModelAndTrack();
  }, [videoRef]);

  return position;
}
