import React from 'react';
import PostsPage from '../components/layout/PostsPage';

const MyCreations = () => {
  const fetchMyPosts = () => 
    fetch('http://localhost:8080/api/post/getMyPosts', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

  const statsMapper = (posts) => [
    { label: 'My Creations', value: posts.length },
  ];

  return <PostsPage pageTitle="My Creations" fetchPostsApi={fetchMyPosts} statsMapper={statsMapper} />;
};

export default MyCreations;
