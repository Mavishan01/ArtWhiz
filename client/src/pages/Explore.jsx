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
    { label: 'Creators', value: new Set(posts.map(p => p.creator?._id).filter(Boolean)).size },
    { label: 'Art Styles', value: new Set(posts.map(p => p.style?.trim().toLowerCase() ).filter(Boolean) ).size },

  ];

  return <PostsPage pageTitle="Explore Creations" fetchPostsApi={fetchAllPosts} statsMapper={statsMapper} />;
};

export default Explore;
