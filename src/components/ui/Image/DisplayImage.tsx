import React, { useEffect, useState } from 'react';
import './DisplayImage.scss';
import defaultImage from '@/assets/images/default-user.png';
import { getHideLoader, getShowLoader } from '@/utils/LoaderContext/LoaderContext';

type DisplayImageProps = {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const DisplayImage: React.FC<DisplayImageProps> = ({ src, alt, children, onClick }) => {
  const [imageSrc, setImageSrc] = useState<string>(src || defaultImage);
  const showLoader = getShowLoader();
  const hideLoader = getHideLoader();

  useEffect(() => {
    if (showLoader) showLoader();
    return () => {
      if (hideLoader) hideLoader();
    };
  }, []);

  const handleImageLoad = () => {
    if (hideLoader) hideLoader();
  };

  const handleImageError = () => {
    setImageSrc(defaultImage);
    if (hideLoader) hideLoader();
  };

  return (
    <div className="image-wrapper">
      <img
        src={imageSrc}
        alt={alt}
        className="image"
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={onClick}
      />

      {children && <div className="content-wrapper">{children}</div>}
    </div>
  );
};

export default DisplayImage;
