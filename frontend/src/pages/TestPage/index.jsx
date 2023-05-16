import React, { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { Modal, Button } from 'antd';

const TestPage = () => {
  // 주소 검색 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedAddress, setPickedAddress] = useState('');
  const onToggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleComplete = address => {
    console.log(address);
    setPickedAddress(address.address);
    onToggleModal();
  };
  return (
    <>
      {' '}
      <Button type='primary' onClick={onToggleModal}>
        Open Modal
      </Button>
      {isModalOpen && (
        <Modal title='대한민국 주소' open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
      <div>{pickedAddress}</div>
    </>
  );
};
export default TestPage;
