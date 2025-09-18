import React from 'react';
import PostsPage from '../components/layout/PostsPage';

const MyCreations = () => {
  const fetchMyPosts = () => fetch('http://localhost:8080/api/post/myPosts');

  const statsMapper = (posts) => [
    { label: 'My Creations', value: posts.length },
  ];

  return <PostsPage pageTitle="My Creations" fetchPostsApi={fetchMyPosts} statsMapper={statsMapper} />;
};

export default MyCreations;
