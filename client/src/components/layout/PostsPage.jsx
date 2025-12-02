import React, { useEffect, useState, useRef } from 'react';
import {
  Container, Header, Title, SearchSection, SearchBar, SearchInput, FilterButton,
  MasonryGrid, CardWrapper, LoadMoreButton, StatsBar, StatItem, StatNumber, StatLabel,
  Dropdown, DropdownItem,
} from './ExploreLayout';
import { SearchRounded, FilterListRounded } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import ImageCard from '../ImageCard';


const PostsPage = ({ pageTitle, fetchPostsApi, statsMapper, filtersMapper }) => {
  const initialVisibleItemsCount = 10;

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(initialVisibleItemsCount);
  const [posts, setPosts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [stats, setStats] = useState([]);

  const dropDownRef = useRef(null);

  const loadMore = () => {
    setVisibleItemsCount(prev => prev + 8);
    console.log('visibleItems: ', visibleItemsCount);
  }

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

        if (statsMapper && filtersMapper) {
          setStats(statsMapper(data));
          setFilters(filtersMapper(data));
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setPosts([]);
        if (statsMapper) setStats([]);
        if (filtersMapper) setFilters([]);
      }
    };

     
    fetchPosts();
  }, [fetchPostsApi, statsMapper, filtersMapper]);

  useEffect(() => {
    const filtered = posts.filter( post => {

      const matchesSearch = 
        post.prompt?.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        post.creator?.firstName?.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        post.creator?.lastName?.toLowerCase().includes(searchQuery.toLocaleLowerCase());

      const matchesFilters = 
        selectedFilters.length === 0 ||
        selectedFilters.includes(post.style?.toLocaleLowerCase());

      return matchesSearch && matchesFilters;
      }
    )

    setFilteredData(filtered.slice(0, visibleItemsCount));

  }, [posts, visibleItemsCount, searchQuery, selectedFilters]);

  useEffect(() => {   // for clicking outside the dropdown
    function handleClickOutside(event) {
      if (showDropdown && dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);   
    }
  }, [showDropdown])
  

  useEffect(() => {
    console.log('filters: ', filters);
    console.log(Array.isArray(filters));
  }, [filters]);

  useEffect(() => {
    console.log('first post: ', filteredData[0]);
  }, [filteredData]);


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

          <FilterButton onClick={() => setShowDropdown(prev => !prev)}>
            <FilterListRounded fontSize="small" />
            Filter
          </FilterButton>

          {showDropdown && (
            <Dropdown ref={dropDownRef}>
              {filters.map(style => {
                const isActive = selectedFilters.includes(style);
                
                return (
                <DropdownItem 
                  key={style}
                  className={isActive? "active" : ""}
                  onClick={() => {
                    setSelectedFilters(prev => 
                      prev.includes(style)
                        ? prev.filter(s => s !== style)
                        : [...prev, style]
                    );
                  }}
                >
                  {style} 
                  {isActive && (
                    <CheckIcon />
                  )}

                </DropdownItem>
                );
              })}
            </Dropdown>
          )}

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

      {visibleItemsCount < posts.length && (
        <LoadMoreButton onClick={loadMore}>
          Load More
        </LoadMoreButton>
      )}
    </Container>
  );
};

export default PostsPage;
