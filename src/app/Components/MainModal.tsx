'use client'
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { X } from 'lucide-react';

interface Props {
  isMainOpen: boolean;
  setIsMainOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainModal: React.FC<Props> = ({isMainOpen, setIsMainOpen}) => {
  

  const showModal = () => {
    setIsMainOpen(true);
  };

  const handleOk = () => {
    setIsMainOpen(false);
  };

  const handleCancel = () => {
    setIsMainOpen(false);
  };

  return (
    <>
      <Modal
        centered
        footer={null}
        wrapClassName="custom-modal"
        width={950}
        open={isMainOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        <div className="width-full h-[600px] w-[900px] flex flex-col justify-center items-center sm:p-[50px]">
          
        </div>
      </Modal>
    </>
  );
};

export default MainModal;