import React from 'react';
import { useParams } from 'react-router-dom';

const FriendDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Friends details {id}</div>;
};

export default FriendDetailsPage;
