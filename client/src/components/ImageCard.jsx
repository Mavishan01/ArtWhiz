import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FavoriteRounded, FavoriteBorderRounded, BookmarkRounded, BookmarkBorderRounded, ShareRounded, MoreVertRounded } from '@mui/icons-material';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// Dynamic height based on aspect ratio
const getRandomHeight = () => {
  const heights = [200, 250, 300, 350, 280, 320, 240, 380];
  return heights[Math.floor(Math.random() * heights.length)];
};

const CardContainer = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.6s ease-out;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px ${({ theme }) => theme.shadow};
    
    .image-overlay {
      opacity: 1;
    }
    
    .creator-info {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: ${props => props.height}px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, ${({ theme }) => theme.primary}20, ${({ theme }) => theme.secondary}20);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.card} 25%, ${({ theme }) => theme.card_light} 50%, ${({ theme }) => theme.card} 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

const TopActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: ${({theme}) => theme.card_light};
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.text_primary};
  
  &:hover {
    background: rgba(58, 54, 58, 1);
    transform: scale(1.1);
  }
  
  &.active {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const CreatorInfo = styled.div`
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.3s ease;
  color: white;
`;

const CreatorName = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: white;
`;

const ContentSection = styled.div`
  padding: 16px;
`;

const PromptText = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.4;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Stats = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TimeAgo = styled.span`
  opacity: 0.8;
`;

const StyleTag = styled.span`
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  position: absolute;
  top: 12px;
  left: 12px;
  backdrop-filter: blur(10px);
`;

const ImageCard = ({ 
  imageUrl, 
  prompt, 
  creator, 
  style = "Digital Art",
  likes = 0, 
  timeAgo = "2h ago",
  onLike,
  onBookmark,
  onShare,
  className 
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageHeight] = useState(() => getRandomHeight());

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    onLike && onLike(!liked);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmark && onBookmark(!bookmarked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    onShare && onShare();
  };

  // const getCreatorInitials = (name) => {
  //   return (
  //     (name?.firstName?.[0] || '') + 
  //     (name?.lastName?.[0] || '')
  //   ).toUpperCase() || 'NA';
  // };

  return (
    <CardContainer className={className}>
      <ImageContainer height={imageHeight}>
        {!imageLoaded && <LoadingPlaceholder />}
        <Image 
          src={imageUrl} 
          alt={prompt}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        
        <StyleTag>{style}</StyleTag>
        
        <ImageOverlay className="image-overlay">
          <TopActions>
            <ActionButton onClick={handleShare}>
              <ShareRounded fontSize="small" />
            </ActionButton>
            <ActionButton>
              <MoreVertRounded fontSize="small" />
            </ActionButton>
          </TopActions>
          
          <CreatorInfo className="creator-info">
            <CreatorName>
              <Avatar>{creator?.firstName[0].toUpperCase()}{creator?.lastName[0].toUpperCase()}</Avatar>
              {creator?.firstName} {creator?.lastName}
            </CreatorName>
          </CreatorInfo>
        </ImageOverlay>
      </ImageContainer>

      <ContentSection>
        <PromptText>"{prompt}"</PromptText>
        
        <MetaInfo>
          <Stats>
            <StatItem>
              <ActionButton 
                onClick={handleLike}
                className={liked ? 'active' : ''}
                style={{ width: '28px', height: '28px' }}
              >
                {liked ? <FavoriteRounded fontSize="small" /> : <FavoriteBorderRounded fontSize="small" />}
              </ActionButton>
              {likes + (liked ? 1 : 0)}
            </StatItem>
            <StatItem>
              <ActionButton 
                onClick={handleBookmark}
                className={bookmarked ? 'active' : ''}
                style={{ width: '28px', height: '28px' }}
              >
                {bookmarked ? <BookmarkRounded fontSize="small" /> : <BookmarkBorderRounded fontSize="small" />}
              </ActionButton>
            </StatItem>
          </Stats>
          <TimeAgo>{timeAgo}</TimeAgo>
        </MetaInfo>
      </ContentSection>
    </CardContainer>
  );
};

export default ImageCard;