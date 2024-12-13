import React from 'react';
import './ListItem.scss';
import Availability from '@/components/ui/Availability/Availability';
import DisplayImage from '@/components/ui/Image/DisplayImage';
import BorderedText from '@/components/ui/BorderedText/BorderedText';
import Button from '@/components/ui/Button/Button';
import { Friend } from '@/models/friend';

type ListItemProps = {
  content?: Friend;
  goToDetails: () => void;
};

const ListItem: React.FC<ListItemProps> = ({ content, goToDetails }) => {
  return (
    <div className="list-item-wrapper">
      <div className="image-container">
        <DisplayImage src={content?.img} alt={content?.firstName ? content.firstName : ''}>
          <Availability
            status={content && content.available ? 'available' : 'not-available'}
          ></Availability>
        </DisplayImage>
      </div>
      <div className="list-item-content-wrapper">
        <div className="content">
          <span>
            {content?.firstName} {content?.lastName}
          </span>
          <BorderedText>{content?.status}</BorderedText>
        </div>
        <Button onClick={goToDetails}>Details</Button>
      </div>
    </div>
  );
};

export default ListItem;
