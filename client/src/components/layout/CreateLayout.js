import styled from 'styled-components';

export const artStyles = [
  { id: 'photorealistic', name: 'Photorealistic', icon: '📸' },
  { id: 'digital-art', name: 'Digital Art', icon: '🎨' },
  { id: 'oil-painting', name: 'Oil Painting', icon: '🖼️' },
  { id: 'watercolor', name: 'Watercolor', icon: '🌊' },
  { id: 'anime', name: 'Anime', icon: '🌸' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: '🔮' },
  { id: 'fantasy', name: 'Fantasy', icon: '🧚' },
  { id: 'minimalist', name: 'Minimalist', icon: '⚪' },
  { id: 'abstract', name: 'Abstract', icon: '🌀' },
  { id: 'steampunk', name: 'Steampunk', icon: '⚙️' }
];

export const aspectRatios = [
  { id: '1:1', name: 'Square', width: 512, height: 512 },
  { id: '4:3', name: 'Standard', width: 512, height: 384 },
  { id: '16:9', name: 'Widescreen', width: 512, height: 288 },
  { id: '9:16', name: 'Portrait', width: 288, height: 512 },
  { id: '3:4', name: 'Photo', width: 384, height: 512 }
];

export const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: clamp(28px, 5vw, 36px);
  font-weight: 700;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  margin: 0;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 20px;
`;

export const CardTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PromptTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.text_secondary}20;
  border-radius: 12px;
  padding: 16px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
    opacity: 0.4;
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const PromptFooter = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CharCount = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

export const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

export const StyleButton = styled.button`
  background: ${({ selected, theme }) => 
    selected 
      ? `linear-gradient(135deg, ${theme.primary}40, ${theme.secondary}40)`
      : theme.bgLight
  };
  border: ${({ selected, theme }) => 
    selected 
      ? `2px solid ${theme.primary}`
      : `1px solid ${theme.text_secondary}20`
  };
  border-radius: 12px;
  padding: 16px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}10;
  }
`;

export const StyleIcon = styled.span`
  font-size: 24px;
`;

export const StyleName = styled.span`
  font-size: 12px;
  color: ${({ selected, theme }) => 
    selected ? theme.primary : theme.text_secondary
  };
  font-weight: 600;
`;

export const AdvancedToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: ${({ expanded }) => expanded ? '20px' : '0'};
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const AdvancedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RatioGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const RatioButton = styled.button`
  background: ${({ selected, theme }) => 
    selected ? theme.primary : theme.bgLight
  };
  border: 1px solid ${({ selected, theme }) => 
    selected ? theme.primary : theme.text_secondary + '40'
  };
  border-radius: 8px;
  padding: 8px 12px;
  color: ${({ selected }) => selected ? 'white' : 'inherit'};
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;

export const GenerateButton = styled.button`
  background: ${({ disabled, theme }) => 
    disabled 
      ? theme.disabled 
      : `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
  };
  border: none;
  border-radius: 16px;
  padding: 18px 24px;
  color: white;
  font-size: 18px;
  font-weight: 700;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: ${({ disabled, theme }) => 
    disabled ? 'none' : `0 8px 25px ${theme.primary}40`
  };
  transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-2px)'};

  &:hover {
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-4px)'};
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const RightPanel = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 24px;
  position: sticky;
  top: 20px;
  height: fit-content;

  @media (max-width: 1024px) {
    position: static;
  }
`;

export const PreviewArea = styled.div`
  aspect-ratio: ${({ ratio }) => ratio.replace(':', '/')};
  background: ${({ theme }) => theme.bgLight};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border: 2px dashed ${({ theme }) => theme.text_secondary}30;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PreviewPlaceholder = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

export const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${({ theme }) => theme.primary}20;
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ActionButton = styled.button`
  flex: ${({ primary }) => primary ? 1 : 'none'};
  background: ${({ primary, theme }) => 
    primary ? theme.green : theme.bgLight
  };
  border: ${({ primary, theme }) => 
    primary ? 'none' : `1px solid ${theme.text_secondary}40`
  };
  border-radius: 10px;
  padding: 12px;
  color: ${({ primary, theme }) => 
    primary ? 'white' : theme.text_primary
  };
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const DetailsCard = styled.div`
  background: ${({ theme }) => theme.bgLight};
  border-radius: 12px;
  padding: 16px;
`;

export const DetailsTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
`;

export const DetailsText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;

  p {
    margin: 4px 0;
  }

  strong {
    color: ${({ theme }) => theme.text_primary};
  }
`;