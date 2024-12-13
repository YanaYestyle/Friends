import React, { useState } from 'react';
import './DisplayImage.scss';
import defaultImage from '@/assets/images/default-user.png';

type DisplayImageProps = {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
};

const DisplayImage: React.FC<DisplayImageProps> = ({ src, alt, children }) => {
  const [imageSrc, setImageSrc] = useState<string>(src || defaultImage);

  const handleImageError = () => {
    setImageSrc(defaultImage);
  };
  return (
    <div className="image-wrapper">
      <img src={imageSrc} alt={alt} className="image" onError={handleImageError} />
      {children && <div className="content-wrapper">{children}</div>}
    </div>
  );
};

export default DisplayImage;
