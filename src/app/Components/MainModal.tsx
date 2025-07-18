'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import { X } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { GlassesModel } from './GlassesModel';
import { OrbitControls } from '@react-three/drei';
import { useMediaPipeFaceTracker } from '../Hooks/UseFacemesh';
import * as faceapi from 'face-api.js'


interface Props {
  isMainOpen: boolean;
  setIsMainOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainModal: React.FC<Props> = ({isMainOpen, setIsMainOpen}) => {
 
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [selected, setSelected] = useState(1);
  const [position, setPosition] = useState<{ x: number; y: number; z: number; scale?: number } | null>(null);


  const showModal = () => {
    setIsMainOpen(true);
  };

  const handleOk = () => {
    setIsMainOpen(false);
  };

  const handleCancel = () => {
    setIsMainOpen(false);
    // Stop the camera stream
    if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => {
        track.stop();
        });
        videoRef.current.srcObject = null;
    }
  };

  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      console.log('Face API models loaded successfully');
      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              // Wait for the video to be ready
              videoRef.current.onloadeddata = () => {
                startDetection(); // Start detection when video is loaded
              };
            }
          })
          .catch((err) => console.error("Error accessing camera:", err));
      } else {
        console.error("getUserMedia not supported in this browser");
      }
    } catch (error) {
      console.error("Error loading face-api models:", error);
    }
  }

  const startDetection = () => {
  if (!videoRef.current) return;

  const canvas = faceapi.createCanvasFromMedia(videoRef.current);
  canvas.id = 'face-canvas';

  const container = videoRef.current?.parentElement;
  if (container) {
    container.appendChild(canvas);
  }
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '20';

  const displaySize = {
    width: videoRef.current.videoWidth,
    height: videoRef.current.videoHeight,
  };

  faceapi.matchDimensions(canvas, displaySize);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }

  const interval = setInterval(async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();

    if (detections) {
      const resized = faceapi.resizeResults(detections, displaySize);

      // Draw
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceLandmarks(canvas, resized);

      // Get landmark points
      const leftEye = resized.landmarks.getLeftEye();
      const rightEye = resized.landmarks.getRightEye();

      // Midpoint between eyes
      const midX = (leftEye[0].x + rightEye[3].x) / 2;
      const midY = (leftEye[0].y + rightEye[3].y) / 2;

      // Normalize to -1..1 (NDC space)
      const normalizedX = (midX / displaySize.width) * 2 - 1;
      const normalizedY = -(midY / displaySize.height) * 2 + 1;

      // Estimate face width
      const eyeDist = Math.hypot(
        rightEye[3].x - leftEye[0].x,
        rightEye[3].y - leftEye[0].y
      );

      const scale = eyeDist / 50; // 🔧 Tweak 50 based on model size

      // Set final values
      setPosition({
        x: normalizedX,
        y: normalizedY,
        z: -0.5,
        scale,
      });
    }
  }, 100);

  return () => clearInterval(interval);
};



  useEffect(() => {
    if(isMainOpen)
    {
      loadModels();
    }
  }, [isMainOpen]);

  useEffect(() => {
    if (videoRef.current?.play) {
      console.log("Video is playing");
    }
  },[])

  
  
  return (
    <>
      <Modal
        centered
        footer={null}
        wrapClassName="custom-main-modal"
        width={1000}
        open={isMainOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        <div className="w-full h-[600px] p-0 flex max-sm:flex-col justify-center items-center">
          <div className='flex-9/12 relative  w-full h-full flex items-center justify-center'>
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                disablePictureInPicture
                controls={false}
                muted
                style={{
                  transform: 'scaleX(-1)',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                className="w-full h-full object-cover rounded-r-4xl"
            />
            <Canvas
              gl={{ alpha: true }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
                <ambientLight />
                <Suspense fallback={null}>
                    <GlassesModel
                     position={[
                      (position?.x ?? 0.5), 
                      (position?.y ?? 0.5), 
                      (position?.z ?? -0.5),
                    ]}
                    scale={position?.scale ?? 1}
                    />
                </Suspense>
                <OrbitControls enableZoom={true} enablePan maxPolarAngle={Math.PI/2}/>
            </Canvas>
          </div>
          <div className='flex-1/2 h-full p-4 box-border'>
            <div className='flex justify-between'>
              <p className='font-semibold'>VictorBans</p>
              <X
                className=" cursor-pointer"
                onClick={handleCancel}
              />
            </div>
            <div className={`mt-4 w-full grid grid-cols-3 gap-2`}>
                <div onClick={() => setSelected(1)} className={`${selected === 1 ? 'border-2 border-[#0064E3] shadow-lg' : 'border hover:border-2 border-[#eaeaea]'} cursor-pointer w-[100px] h-[100px] flex items-center justify-center rounded-3xl overflow-hidden shadow-lg `}>
                    <img src="/glasses1.png"  alt="" />
                </div>

                <div onClick={() => setSelected(2)} className={`${selected === 2 ? 'border-2 border-[#0064E3] shadow-lg' : 'border hover:border-2 border-[#eaeaea]'} cursor-pointer w-[100px] h-[100px] flex items-center justify-center rounded-3xl overflow-hidden shadow-lg `}>
                    <img src="/glasses1.png"  alt="" />
                </div>

                <div onClick={() => setSelected(3)} className={`${selected === 3 ? 'border-2 border-[#0064E3] shadow-lg' : 'border hover:border-2 border-[#eaeaea]'} cursor-pointer w-[100px] h-[100px] flex items-center justify-center rounded-3xl overflow-hidden shadow-lg `}>
                    <img src="/glasses1.png"  alt="" />
                </div>

                <div onClick={() => setSelected(4)} className={`${selected === 4 ? 'border-2 border-[#0064E3] shadow-lg' : 'border hover:border-2 border-[#eaeaea]'} cursor-pointer w-[100px] h-[100px] flex items-center justify-center rounded-3xl overflow-hidden shadow-lg `}>
                    <img src="/glasses1.png"  alt="" />
                </div>

                <div onClick={() => setSelected(5)} className={`${selected === 5 ? 'border-2 border-[#0064E3] shadow-lg' : 'border hover:border-2 border-[#eaeaea]'} cursor-pointer w-[100px] h-[100px] flex items-center justify-center rounded-3xl overflow-hidden shadow-lg `}>
                    <img src="/glasses1.png"  alt="" />
                </div>

                <div onClick={() => setSelected(6)} className={`${selected === 6 ? 'border-2 border-[#0064E3] shadow-lg' : 'border hover:border-2 border-[#eaeaea]'} cursor-pointer w-[100px] h-[100px] flex items-center justify-center rounded-3xl overflow-hidden shadow-lg `}>
                    <img src="/glasses1.png"  alt="" />
                </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MainModal;