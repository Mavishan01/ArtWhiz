import React, { useEffect, useState } from 'react';
import {
  Container, Header, Title, SearchSection, SearchBar, SearchInput, FilterButton,
  MasonryGrid, CardWrapper, LoadMoreButton, StatsBar, StatItem, StatNumber, StatLabel
} from './ExploreLayout';
import { SearchRounded, FilterListRounded } from '@mui/icons-material';
import ImageCard from '../ImageCard';

const PostsPage = ({ pageTitle, fetchPostsApi, statsMapper }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleItems, setVisibleItems] = useState(8);
  const [posts, setPosts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [stats, setStats] = useState([]);

  const loadMore = () => setVisibleItems(prev => prev + 8);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchPostsApi();

        // token errors
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            console.error("Invalid or expired token");
            
            window.location.href = "/login";
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return; // stop execution
        }

        const result = await response.json();
        const data = result.data || [];
        setPosts(data);

        if (statsMapper) {
          setStats(statsMapper(data));
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setPosts([]);
        if (statsMapper) setStats([]);
      }
    };
    fetchPosts();
  }, [fetchPostsApi, statsMapper]);

  useEffect(() => {
    setFilteredData(posts.slice(0, visibleItems));
  }, [posts, visibleItems]);

  return (
    <Container>
      <Header>
        <Title>{pageTitle}</Title>
        <SearchSection>
          <SearchBar>
            <SearchRounded style={{ color: '#666' }} />
            <SearchInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
          <FilterButton>
            <FilterListRounded fontSize="small" />
            Filter
          </FilterButton>
        </SearchSection>
      </Header>

      {stats.length > 0 && (
        <StatsBar>
          {stats.map(({ label, value }, idx) => (
            <StatItem key={idx}>
              <StatNumber>{value}</StatNumber>
              <StatLabel>{label}</StatLabel>
            </StatItem>
          ))}
        </StatsBar>
      )}

      <MasonryGrid>
        {filteredData.map((data) => (
          <CardWrapper key={data.id}>
            <ImageCard
              imageUrl={data.imageUrl}
              prompt={data.prompt}
              creator={data.creator}
              style={data.style || ' General'}
            />
          </CardWrapper>
        ))}
      </MasonryGrid>

      {visibleItems < posts.length && (
        <LoadMoreButton onClick={loadMore}>
          Load More
        </LoadMoreButton>
      )}
    </Container>
  );
};

export default PostsPage;
