import React from 'react';
import PostsPage from '../components/layout/PostsPage';

const Explore = () => {
  const fetchAllPosts = () => 
    fetch('http://localhost:8080/api/post/getAllPosts', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

  const statsMapper = (posts) => [
    { label: 'Total Images', value: posts.length },
    { label: 'Artists', value: new Set(posts.map(p => p.name)).size },
    { label: 'Art Styles', value: new Set(posts.map(p => p.style)).size },
  ];

  return <PostsPage pageTitle="Explore Creations" fetchPostsApi={fetchAllPosts} statsMapper={statsMapper} />;
};

export default Explore;
