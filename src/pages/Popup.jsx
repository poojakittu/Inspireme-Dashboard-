// src/components/Popup.js
import React, { useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';

const Popup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Use useEffect to open the popup when the component mounts
  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      {/* The pop-up */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome to our website!</ModalHeader>
          <ModalBody>
            <p>This is a pop-up example.</p>
          </ModalBody>
          <ModalFooter>
            <button onClick={onClose}>Close</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Popup;
