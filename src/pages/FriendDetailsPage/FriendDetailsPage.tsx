import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageButton from '@/components/ui/ImageButton/ImageButton';
import { FiArrowLeft } from 'react-icons/fi';
import './FriendDetailsPage.scss';
import { getFriendDetails } from '@/services/get-friend-details';
import Availability from '@/components/ui/Availability/Availability';
import BorderedText from '@/components/ui/BorderedText/BorderedText';
import DisplayImage from '@/components/ui/Image/DisplayImage';
import { FriendDetails } from '@/models/friend-details';
import Navs from '@/components/ui/Navs/Navs';
import FullScreenModal from '@/components/ui/FullScreenModal/FullScreenModal';

const FriendDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [friend, setFriend] = useState<FriendDetails | undefined>();
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setFullScreenImage(imageUrl);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  useEffect(() => {
    const fetchFriendDetails = async () => {
      try {
        const data = await getFriendDetails(id!);
        setFriend(data);
      } catch (error) {
        if (error) navigate('/friends');
      }
    };

    if (id) fetchFriendDetails();
  }, [id, navigate]);

  const getRandomStatus = (indexes: string[] | undefined): string => {
    if (!indexes || indexes.length === 0) {
      return '';
    }
    const randomIndex = Math.floor(Math.random() * indexes.length);
    return indexes[randomIndex];
  };

  const goBack = () => {
    navigate('/friends');
  };

  return (
    <div className="friend-details-page-container-wrapper">
      <ImageButton onClick={goBack}>
        <FiArrowLeft color="#2E57FA" size={16} />
      </ImageButton>
      <div className="friend-details-page-container">
        <div className="friend-details-page-wrapper">
          <div className="friend-details-page-header-content-wrapper">
            <div className="friend-details-page-image-container">
              <DisplayImage src={friend?.img} alt={friend?.firstName ? friend.firstName : ''}>
                <Availability
                  status={friend && friend.available ? 'available' : 'not-available'}
                ></Availability>
              </DisplayImage>
            </div>
            <div className="friend-details-page-header-content">
              <span>
                {friend?.firstName} {friend?.lastName}
              </span>
              <BorderedText>{getRandomStatus(friend?.statuses)}</BorderedText>
            </div>
          </div>
          <Navs items={['Info', 'Photos']}>
            <div className="friend-details-page-navs-content-wrapper">
              <div className="friend-details-page-info">
                {friend && friend.bio && (
                  <>
                    <div className="friend-details-page-grid-info bio">
                      <span>Bio:</span>
                      <span>{friend.bio}</span>
                    </div>
                    <div className="divider"></div>
                  </>
                )}
                {friend && friend.phone && (
                  <>
                    <div className="friend-details-page-grid-info">
                      <span>Phone:</span>
                      <span>{friend.phone}</span>
                    </div>
                    <div className="divider"></div>
                  </>
                )}
                {friend && (
                  <div className="friend-details-page-grid-info">
                    {friend && friend.address && (
                      <>
                        <span>Address:</span>
                        <span>{friend.address}</span>
                      </>
                    )}
                    {friend && friend.city && (
                      <>
                        <span>City:</span>
                        <span>{friend.city}</span>
                      </>
                    )}
                    {friend && friend.state && (
                      <>
                        <span>State:</span>
                        <span>{friend.state}</span>
                      </>
                    )}
                    {friend && friend.zipCode && (
                      <>
                        <span>Zipcode:</span>
                        <span>{friend.zipCode}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="friend-details-page-navs-content-wrapper">
              {!friend?.photos ? (
                <div>No data available</div>
              ) : (
                <div className="friend-details-page-grid-photos">
                  {friend?.photos.map((photo, index) => (
                    <DisplayImage
                      key={index}
                      src={photo}
                      alt={friend?.firstName ? friend.firstName : ''}
                      onClick={() => handleImageClick(photo)}
                    />
                  ))}
                </div>
              )}
            </div>
          </Navs>
        </div>
      </div>
      <FullScreenModal isOpen={!!fullScreenImage} onClose={closeFullScreen}>
        <DisplayImage src={fullScreenImage || ''} alt="" />
      </FullScreenModal>
    </div>
  );
};

export default FriendDetailsPage;
