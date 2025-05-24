'use client'
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { X } from 'lucide-react';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMainOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalComponent: React.FC<Props> = ({isModalOpen, setIsModalOpen, setIsMainOpen}) => {
  

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsMainOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        centered
        footer={null}
        wrapClassName="custom-modal"
        width={650}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        <div className="width-full h-full flex flex-col justify-center items-center sm:p-[50px]">
          <div className='w-full flex items-center justify-between mb-12'>
            <p className='text-[#1c2b33] text-[1.7rem] font-normal'>Turn on virtual try-on?</p>
            <X onClick={handleCancel} className='cursor-pointer hover:text-[#0064E3]'/>
          </div>
          <div>
            <p className='text-[#1c2b33] text-[1rem] font-normal'>
                When you turn on virtual try-on, you'll see 3D renders of our eyewear on your face. We estimate the location of your facial features to ensure realistic rendering and tracking. This technology is not facial recognition and this information is not used to identify you.
            </p>
          </div>
          <div className='w-full flex max-sm:flex-col max-sm:gap-4 mt-12'>
            <Button
              type="primary"
              shape='round'
              className='w-full mr-4 font-extrabold'
              size='large'
              onClick={handleOk}
              
            >
              Turn on
            </Button>
            <Button
              type="default"
              className='w-full'
              shape='round'
              size='large'
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;