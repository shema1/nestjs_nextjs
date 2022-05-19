import React, { ReactNode } from 'react';
import { Box, Modal as MUIModal } from '@mui/material';


interface ModalProps {
  setIsOpenModal: (isOpen: boolean) => void
  isOpen: boolean,
  children: ReactNode,
}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: "10px !important"
};

const Modal: React.FC<ModalProps> = ({ setIsOpenModal, isOpen, children }) => {

  const handleClose = () => setIsOpenModal(false);
  return (
    <div>
      <MUIModal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
        </Box>
      </MUIModal>

    </div>
  );
};

export default Modal;