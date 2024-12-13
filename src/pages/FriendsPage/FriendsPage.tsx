import React, { useEffect, useState } from 'react';
import './FriendsPage.scss';
import List from '@/components/ui/List/List';
import ListItem from '@/components/shared/ListItem/ListItem';
import { Friend } from '@/models/friend';
import { getFriends } from '@/services/get-frients';
import { useNavigate } from 'react-router-dom';

const FriendsPage = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState<Friend[] | undefined>([]);
  const [visibleItems, setVisibleItems] = useState<number>(10);

  useEffect(() => {
    const fetchFriends = async () => {
      const data = await getFriends();
      setFriends(data);
    };

    fetchFriends();
  }, []);

  const loadMoreItems = async () => {
    setVisibleItems((prev) => prev + 10);
  };

  const goToDetails = (id: number) => {
    navigate(`/friends/${id}`);
  };
  return (
    <div className="friends-page-container">
      <div className="title">
        <span>Friends</span>
      </div>
      <div className="friends-page-list-wrapper">
        {!friends ? (
          <div>No data available</div>
        ) : (
          <List
            items={friends ? friends.slice(0, visibleItems) : []}
            loadMore={loadMoreItems}
            layout="list"
            height={580}
            width={714}
            itemSize={90}
            renderItem={(item) => (
              <ListItem key={item.id} content={item} goToDetails={() => goToDetails(item.id)} />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
