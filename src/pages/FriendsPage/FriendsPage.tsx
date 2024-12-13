import React, { useEffect, useState } from 'react';
import './FriendsPage.scss';
import List from '@/components/ui/List/List';
import ListItem from '@/components/shared/ListItem/ListItem';
import { Friend } from '@/models/friend';
import { useNavigate } from 'react-router-dom';
import { getFriends } from '@/services/get-friends';

const FriendsPage = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState<Friend[] | undefined>([]);
  const [visibleItems, setVisibleItems] = useState<number>(10);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getFriends();
        setFriends(data);
      } catch (error) {
        return error;
      }
    };

    fetchFriends();
  }, []);

  const loadMoreItems = async () => {
    setVisibleItems((prev) => prev + 10);
  };

  /* In the current implementation, we are using a workaround to navigate to the friend's details page 
  due to an issue with the API that causes the id to be inconsistent or unreliable. 
  Normally, the correct way to navigate to a friend's details page is: navigate(`/friends/${id}`);*/
  const randomizeId = (_id: number): string => {
    const randomString = Math.random().toString(36).substring(2, 10);
    return Math.random() > 0.5 ? randomString : 'id';
  };

  const goToDetails = (id: number) => {
    const randomizedId = randomizeId(id);
    navigate(`/friends/${randomizedId}`);
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
            height={565}
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
