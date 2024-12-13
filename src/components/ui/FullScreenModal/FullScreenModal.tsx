import React, { ReactNode } from 'react';
import './FullScreenModal.scss';
import ImageButton from '../ImageButton/ImageButton';
import { MdClose } from 'react-icons/md';

type FullScreenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const FullScreenModal: React.FC<FullScreenModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="full-screen-container">
        <div className="full-screen-container-close-button">
          <ImageButton variant="secondary" onClick={onClose}>
            <MdClose color="#FFFFFF" size={16} />
          </ImageButton>
        </div>
        <div className="full-screen-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
