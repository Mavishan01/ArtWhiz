import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageCard from '../components/ImageCard';
import { SearchRounded, FilterListRounded, GridViewRounded } from '@mui/icons-material';

const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.bg};
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
`;

const Title = styled.h1`
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary}20;
  border-radius: 25px;
  padding: 8px 16px;
  gap: 8px;
  min-width: 300px;
  
  @media (max-width: 768px) {
    min-width: 0;
    flex: 1;
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  flex: 1;
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const FilterButton = styled.button`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary}20;
  border-radius: 12px;
  padding: 10px 16px;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}10;
  }
`;

// Pinterest-style Masonry Grid
const MasonryGrid = styled.div`
  column-count: 4;
  column-gap: 20px;
  column-fill: balance;

  @media (max-width: 1200px) {
    column-count: 3;
  }

  @media (max-width: 768px) {
    column-count: 2;
    column-gap: 15px;
  }

  @media (max-width: 480px) {
    column-count: 1;
    column-gap: 0;
  }
`;

const CardWrapper = styled.div`
  break-inside: avoid;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const LoadMoreButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 40px auto;
  display: block;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.primary}40;
  }
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  padding: 20px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;

  @media (max-width: 768px) {
    gap: 20px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleItems, setVisibleItems] = useState(8);
  const [posts, setPosts] = useState([]);
  const [filteredData, setfilteredData] = useState([]);

  const loadMore = () => {
    setVisibleItems(prev => prev + 8);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/post/getAllPosts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setPosts(result.data || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setfilteredData(posts.slice(0, visibleItems));
  },[posts, visibleItems]);

  return (
    <Container>
      <Header>
        <Title>Explore Creations</Title>
        <SearchSection>
          <SearchBar>
            <SearchRounded style={{ color: '#666' }} />
            <SearchInput 
              placeholder="Search for styles, prompts, or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
          <FilterButton>
            <FilterListRounded fontSize="small" />
            Filter
          </FilterButton>
          <FilterButton>
            <GridViewRounded fontSize="small" />
            View
          </FilterButton>
        </SearchSection>
      </Header>

      <StatsBar>
        <StatItem>
          <StatNumber>{posts?.length ?? 0}</StatNumber>
          <StatLabel>Total Images</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>0</StatNumber>
          <StatLabel>Artists</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>0</StatNumber>
          <StatLabel>Art Styles</StatLabel>
        </StatItem>
      </StatsBar>

      <MasonryGrid>
        {filteredData.map((data) => (
          <CardWrapper key={data.id}>
            <ImageCard 
              imageUrl={data.imageUrl}
              prompt={data.prompt}
              // author={data.author}
              // style={data.style}
              // likes={data.likes}
              // timeAgo={data.timeAgo}
              // onLike={(liked) => console.log(`${liked ? 'Liked' : 'Unliked'} image ${data.id}`)}
              // onBookmark={(bookmarked) => console.log(`${bookmarked ? 'Bookmarked' : 'Unbookmarked'} image ${data.id}`)}
              // onShare={() => console.log(`Shared image ${data.id}`)}
            />
          </CardWrapper>
        ))}
      </MasonryGrid>

      {visibleItems < posts.length && (
        <LoadMoreButton onClick={loadMore}>
          Load More Creations
        </LoadMoreButton>
      )}
    </Container>
  );
};

export default Explore;