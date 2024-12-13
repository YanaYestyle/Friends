import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import FriendsPage from '@/pages/FriendsPage/FriendsPage';
import FriendDetailsPage from './pages/FriendDetailsPage/FriendDetailsPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/friends" />,
    },
    {
      path: '/friends',
      element: <FriendsPage />,
    },
    {
      path: '/friends/:id',
      element: <FriendDetailsPage />,
    },
    {
      path: '*',
      element: <Navigate to="/friends" />,
    },
  ],
  {
    future: {
      v7_startTransition: true, // Enable the startTransition flag
    },
  },
);
