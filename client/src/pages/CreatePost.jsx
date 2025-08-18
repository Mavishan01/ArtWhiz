import React, { useState } from 'react';
import styled from 'styled-components';
import { Camera, Wand2, Settings, Download, Share2, Heart, Bookmark, Sparkles, Zap, Palette } from 'lucide-react';

const artStyles = [
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

const aspectRatios = [
  { id: '1:1', name: 'Square', width: 512, height: 512 },
  { id: '4:3', name: 'Standard', width: 512, height: 384 },
  { id: '16:9', name: 'Widescreen', width: 512, height: 288 },
  { id: '9:16', name: 'Portrait', width: 288, height: 512 },
  { id: '3:4', name: 'Photo', width: 384, height: 512 }
];

const Container = styled.div`
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

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
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

const Subtitle = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  margin: 0;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 20px;
`;

const CardTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PromptTextarea = styled.textarea`
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

const PromptFooter = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CharCount = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const ExampleButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.primary}40;
  border-radius: 8px;
  padding: 6px 12px;
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}10;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

const StyleButton = styled.button`
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

const StyleIcon = styled.span`
  font-size: 24px;
`;

const StyleName = styled.span`
  font-size: 12px;
  color: ${({ selected, theme }) => 
    selected ? theme.primary : theme.text_secondary
  };
  font-weight: 600;
`;

const AdvancedToggle = styled.button`
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

const AdvancedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RatioGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const RatioButton = styled.button`
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

const NegativePromptTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.text_secondary}20;
  border-radius: 8px;
  padding: 12px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
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

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;

const GenerateButton = styled.button`
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

const Spinner = styled.div`
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

const RightPanel = styled.div`
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

const PreviewArea = styled.div`
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

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PreviewPlaceholder = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const LoadingSpinner = styled.div`
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

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const ActionButton = styled.button`
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

const DetailsCard = styled.div`
  background: ${({ theme }) => theme.bgLight};
  border-radius: 12px;
  padding: 16px;
`;

const DetailsTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
`;

const DetailsText = styled.div`
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

const CreatePost = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Photorealistic');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setGeneratedImage({
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=512&h=512&fit=crop",
        prompt: prompt,
        style: selectedStyle,
        timestamp: new Date().toISOString()
      });
      setIsGenerating(false);
    }, 3000);
  };


  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>
            <Wand2 size={36} style={{ color: ({ theme }) => theme.primary }} />
            Create AI Artwork
          </Title>
          <Subtitle>
            Transform your imagination into stunning visual art with AI
          </Subtitle>
        </Header>

        <MainGrid>
          <LeftPanel>
            {/* Prompt Input */}
            <Card>
              <CardTitle>
                <Sparkles size={20} />
                Describe Your Vision
              </CardTitle>
              <PromptTextarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A majestic dragon soaring through storm clouds with lightning illuminating its scales..."
                maxLength={500}
              />
              <PromptFooter>
                <CharCount>
                  {prompt.length}/500 characters
                </CharCount>
                <ExampleButton
                  onClick={() => setPrompt('A mystical fantasy landscape with floating islands, waterfalls cascading into clouds, ethereal lighting, and magical creatures')}
                >
                  Use Example
                </ExampleButton>
              </PromptFooter>
            </Card>

            {/* Art Style Selection */}
            <Card>
              <CardTitle>
                <Palette size={20} />
                Art Style
              </CardTitle>
              <StyleGrid>
                {artStyles.map(style => (
                  <StyleButton
                    key={style.id}
                    selected={selectedStyle === style.id}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <StyleIcon>{style.icon}</StyleIcon>
                    <StyleName selected={selectedStyle === style.id}>
                      {style.name}
                    </StyleName>
                  </StyleButton>
                ))}
              </StyleGrid>
            </Card>

            {/* Advanced Settings */}
            <Card>
              <AdvancedToggle
                expanded={showAdvanced}
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Settings size={20} />
                Advanced Settings
                <span style={{ 
                  transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  fontSize: '12px'
                }}>
                  ▼
                </span>
              </AdvancedToggle>

              {showAdvanced && (
                <AdvancedContent>
                  {/* Aspect Ratio */}
                  <div>
                    <Label>Aspect Ratio</Label>
                    <RatioGrid>
                      {aspectRatios.map(ratio => (
                        <RatioButton
                          key={ratio.id}
                          selected={selectedRatio === ratio.id}
                          onClick={() => setSelectedRatio(ratio.id)}
                        >
                          {ratio.name} ({ratio.id})
                        </RatioButton>
                      ))}
                    </RatioGrid>
                  </div>

                  {/* Negative Prompt */}
                  <div>
                    <Label>Negative Prompt (Optional)</Label>
                    <NegativePromptTextarea
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="What you don't want in the image: blurry, low quality, distorted..."
                    />
                  </div>

                </AdvancedContent>
              )}
            </Card>

            {/* Generate Button */}
            <GenerateButton
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Spinner />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Generate Image
                </>
              )}
            </GenerateButton>
          </LeftPanel>

          {/* Right Panel - Preview */}
          <RightPanel>
            <CardTitle>Preview</CardTitle>
            
            <PreviewArea ratio={selectedRatio}>
              {generatedImage ? (
                <PreviewImage 
                  src={generatedImage.url} 
                  alt="Generated artwork"
                />
              ) : isGenerating ? (
                <PreviewPlaceholder>
                  <LoadingSpinner />
                  <p style={{ margin: '0', fontSize: '14px' }}>Creating your artwork...</p>
                </PreviewPlaceholder>
              ) : (
                <PreviewPlaceholder>
                  <Camera size={48} style={{ marginBottom: '12px' }} />
                  <p style={{ margin: '0', fontSize: '14px' }}>Your generated image will appear here</p>
                </PreviewPlaceholder>
              )}
            </PreviewArea>

            {generatedImage && (
              <div style={{ marginTop: '20px' }}>
                <ActionButtons>
                  <ActionButton primary>
                    <Download size={16} />
                    Download
                  </ActionButton>
                  <ActionButton>
                    <Heart size={16} />
                  </ActionButton>
                  <ActionButton>
                    <Bookmark size={16} />
                  </ActionButton>
                  <ActionButton>
                    <Share2 size={16} />
                  </ActionButton>
                </ActionButtons>

                <DetailsCard>
                  <DetailsTitle>Generation Details</DetailsTitle>
                  <DetailsText>
                    <p><strong>Style:</strong> {artStyles.find(s => s.id === selectedStyle)?.name}</p>
                    <p><strong>Dimensions:</strong> {aspectRatios.find(r => r.id === selectedRatio)?.width} × {aspectRatios.find(r => r.id === selectedRatio)?.height}</p>
                  </DetailsText>
                </DetailsCard>
              </div>
            )}
          </RightPanel>
        </MainGrid>
      </Wrapper>
    </Container>
  );
};

export default CreatePost;