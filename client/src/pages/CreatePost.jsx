import React, { useEffect, useState } from 'react';
import { Camera, Wand2, Settings, Download, Share2, Heart, Bookmark, Sparkles, Zap, Palette } from 'lucide-react';
import {
  artStyles, aspectRatios, Container, Wrapper, Header, Title, Subtitle, MainGrid, LeftPanel, Card, CardTitle, PromptTextarea, PromptFooter, 
  CharCount, StyleGrid, StyleButton, StyleIcon, StyleName, AdvancedToggle, AdvancedContent, RatioGrid, RatioButton, Label, GenerateButton, 
  Spinner, RightPanel, PreviewArea, PreviewImage, PreviewPlaceholder, LoadingSpinner, ActionButtons, ActionButton, DetailsCard, DetailsTitle, DetailsText
} from '../components/layout/CreateLayout';

const CreatePost = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    console.log('selectedStyle: ', selectedStyle);
    console.log('selectedRatio: ', selectedRatio);
  }, [selectedStyle, selectedRatio])
  

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    try {
      const styledPrompt = selectedStyle ? 
        `${prompt}, in ${selectedStyle} style` :
        prompt;

      const response = await fetch("http://localhost:8080/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: styledPrompt,
          aspectRatio: selectedRatio,
        }),
      });

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
        setGeneratedImage({
          url: result.image,
          prompt,
          style: selectedStyle,
          timestamp: new Date().toISOString(),
        });

      // console.log('url: ', result.image);

      // image sending for Cloudinary + MongoDB
      const saveResponse = await fetch("http://localhost:8080/api/post/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          prompt,
          image: result.image,
          style: selectedStyle,
          aspectRatio: selectedRatio,
        })
      });

      if (!saveResponse.ok) throw new Error("Failed to save post");

      // const savedPost = await saveResponse.json();
      // console.log("Post saved:", savedPost.data);


    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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