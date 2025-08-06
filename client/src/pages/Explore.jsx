import React, { useState } from 'react';
import styled from 'styled-components';
import ImageCard from '../components/ImageCard';
import { SearchRounded, FilterListRounded, GridViewRounded } from '@mui/icons-material';

const dummyImageData = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    prompt: "A majestic dragon soaring through storm clouds with lightning illuminating its scales in cyberpunk neon colors",
    author: "Alex Chen",
    style: "Cyberpunk",
    likes: 127,
    timeAgo: "2h ago"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=350&fit=crop",
    prompt: "Enchanted forest with glowing mushrooms and fairy lights dancing between ancient oak trees",
    author: "Sarah Williams",
    style: "Fantasy Art",
    likes: 89,
    timeAgo: "4h ago"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=280&fit=crop",
    prompt: "Futuristic city skyline at sunset with flying cars and holographic advertisements floating in mid-air",
    author: "Mike Rodriguez",
    style: "Sci-Fi",
    likes: 203,
    timeAgo: "6h ago"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=320&fit=crop",
    prompt: "Serene Japanese garden with cherry blossoms falling over a traditional wooden bridge and koi pond",
    author: "Yuki Tanaka",
    style: "Traditional",
    likes: 156,
    timeAgo: "8h ago"
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1754110634187-3a40e4744a80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prompt: "Abstract geometric patterns in vibrant purple and gold creating a kaleidoscope effect with crystalline structures",
    author: "Emma Thompson",
    style: "Abstract",
    likes: 74,
    timeAgo: "12h ago"
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=380&fit=crop",
    prompt: "Mystical underwater city with bioluminescent coral structures and swimming mermaids",
    author: "Ocean Explorer",
    style: "Fantasy Art",
    likes: 98,
    timeAgo: "1d ago"
  },
  {
    id: 7,
    imageUrl: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=220&fit=crop",
    prompt: "Minimalist geometric architecture with clean lines and dramatic shadows",
    author: "Design Architect",
    style: "Minimalist",
    likes: 145,
    timeAgo: "1d ago"
  },
  {
    id: 8,
    imageUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=340&fit=crop",
    prompt: "Steampunk airship floating above Victorian London with brass gears and steam",
    author: "Victorian Dreamer",
    style: "Steampunk",
    likes: 167,
    timeAgo: "2d ago"
  }
];

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

  const loadMore = () => {
    setVisibleItems(prev => prev + 8);
  };

  const filteredData = dummyImageData.slice(0, visibleItems);

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
          <StatNumber>12,847</StatNumber>
          <StatLabel>Total Images</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>2,156</StatNumber>
          <StatLabel>Artists</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>45</StatNumber>
          <StatLabel>Art Styles</StatLabel>
        </StatItem>
      </StatsBar>

      <MasonryGrid>
        {filteredData.map((data) => (
          <CardWrapper key={data.id}>
            <ImageCard 
              imageUrl={data.imageUrl}
              prompt={data.prompt}
              author={data.author}
              style={data.style}
              likes={data.likes}
              timeAgo={data.timeAgo}
              onLike={(liked) => console.log(`${liked ? 'Liked' : 'Unliked'} image ${data.id}`)}
              onBookmark={(bookmarked) => console.log(`${bookmarked ? 'Bookmarked' : 'Unbookmarked'} image ${data.id}`)}
              onShare={() => console.log(`Shared image ${data.id}`)}
            />
          </CardWrapper>
        ))}
      </MasonryGrid>

      {visibleItems < dummyImageData.length && (
        <LoadMoreButton onClick={loadMore}>
          Load More Creations
        </LoadMoreButton>
      )}
    </Container>
  );
};

export default Explore;