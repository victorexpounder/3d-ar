'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import { X } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { GlassesModel } from './GlassesModel';
import { OrbitControls } from '@react-three/drei';

interface Props {
  isMainOpen: boolean;
  setIsMainOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainModal: React.FC<Props> = ({isMainOpen, setIsMainOpen}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [selected, setSelected] = useState(1);

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

  useEffect(() => {
    if(isMainOpen)
    {
      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch((err) => console.error("Error accessing camera:", err));
      } else {
        console.error("getUserMedia not supported in this browser");
      }
    }
  }, [isMainOpen]);

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
                style={{transform: 'scaleX(-1)'}} 
                className="w-full h-full object-cover rounded-r-4xl"
            />
            <Canvas  gl={{ alpha: true }} style={{ position: 'absolute', top: 0, left: 0 }}>
                <ambientLight />
                <Suspense fallback={null}>
                    <GlassesModel
                    position={[Math.PI/2, Math.PI/2, 0]}
                    />
                </Suspense>
                <OrbitControls enableZoom={true} maxPolarAngle={Math.PI/2}/>
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