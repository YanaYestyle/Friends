import React from 'react';
import './Modal.scss';
import Button from '@/components/ui/Button/Button';

type ModalProps = {
  message: string;
  onClose: () => void;
  buttonText: string;
  title?: string;
};

const Modal: React.FC<ModalProps> = ({ message, onClose, buttonText, title }) => {
  return (
    <div className="overlay">
      <div className="modal-wrapper">
        {title && <h3>{title}</h3>}
        <p>{message}</p>
        <Button onClick={onClose}>{buttonText}</Button>
      </div>
    </div>
  );
};

export default Modal;
