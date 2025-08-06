import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 5px ${props => props.theme?.secondary || '#9747FF'}40;
  }
  50% {
    text-shadow: 0 0 20px ${props => props.theme?.secondary || '#9747FF'}60, 0 0 30px ${props => props.theme?.secondary || '#9747FF'}40;
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.bg};
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse at 20% 50%, ${({ theme }) => theme.primary}15 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, ${({ theme }) => theme.secondary}15 0%, transparent 50%),
      radial-gradient(ellipse at 40% 80%, ${({ theme }) => theme.secondary}10 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Section = styled.section`
  position: relative;
  z-index: 1;
  padding: 40px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    padding: 30px 20px 25px;
    gap: 25px;
  }

  @media (max-width: 480px) {
    padding: 25px 12px 20px;
    gap: 20px;
  }
`;

const HeroSection = styled(Section)`
  min-height: 80vh;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 40px;
`;

const Headline = styled.div`
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  line-height: 1.1;
  animation: ${fadeInUp} 0.8s ease-out;
  max-width: 900px;
  margin-bottom: 20px;
`;

const Subtitle = styled.div`
  font-size: clamp(18px, 3.5vw, 28px);
  font-weight: 500;
  background: linear-gradient(135deg, ${({ theme }) => theme.secondary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 20px;
  animation: ${glow} 3s ease-in-out infinite;
  letter-spacing: 0.5px;
`;

const Description = styled.p`
  font-size: clamp(16px, 2.5vw, 22px);
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 700px;
  line-height: 1.6;
  margin: 0;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${({ theme }) => theme.primary}30;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.primary}40;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 14px 30px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;

  @media (max-width: 768px) {
    gap: 30px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SampleGallery = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
  animation: ${slideInLeft} 1s ease-out 0.8s both;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
`;

const SampleCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${({ theme }) => theme.shadow};
  }
`;

const SampleImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}20, ${({ theme }) => theme.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 480px) {
    height: 150px;
    font-size: 36px;
  }
`;

const SamplePrompt = styled.div`
  padding: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  font-style: italic;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1000px;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 500px;
    gap: 25px;
  }
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary}15;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.secondary}60;
    box-shadow: 0 15px 40px ${({ theme }) => theme.shadow};
  }
`;

const FeatureIcon = styled.div`
  font-size: 56px;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 8px ${({ theme }) => theme.shadow});
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const FeatureText = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
`;

const SectionTitle = styled.h2`
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin-bottom: 20px;
`;

const Home = () => {
  const [stats, setStats] = useState({
    images: 0,
    users: 0,
    styles: 0
  });

  useEffect(() => {
    // Animate counter numbers
    const animateStats = () => {
      const targets = { images: 50420, users: 12340, styles: 25 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          images: Math.floor(targets.images * progress),
          users: Math.floor(targets.users * progress),
          styles: Math.floor(targets.styles * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(targets);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <HeroSection>
        <Headline>
          Transform Ideas into Visual Masterpieces
          <Subtitle>~ Where Imagination Meets Artificial Intelligence ~</Subtitle>
        </Headline>
        
        <Description>
          Experience the future of creative expression with our cutting-edge AI image generator. 
          Turn your wildest concepts into stunning visuals with just a few words.
        </Description>

        <CTAContainer>
          <PrimaryButton>Start Creating Now</PrimaryButton>
          <SecondaryButton>Explore Gallery</SecondaryButton>
        </CTAContainer>

        <StatsContainer>
          <StatItem>
            <StatNumber>{stats.images.toLocaleString()}+</StatNumber>
            <StatLabel>Images Generated</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.users.toLocaleString()}+</StatNumber>
            <StatLabel>Happy Creators</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.styles}+</StatNumber>
            <StatLabel>Art Styles</StatLabel>
          </StatItem>
        </StatsContainer>
      </HeroSection>

      <Section>
        <SectionTitle>See What's Possible</SectionTitle>
        <SampleGallery>
          <SampleCard delay={0}>
            <SampleImage>🏰</SampleImage>
            <SamplePrompt>"A magical castle floating in the clouds"</SamplePrompt>
          </SampleCard>
          <SampleCard delay={0.2}>
            <SampleImage>🐉</SampleImage>
            <SamplePrompt>"Cyberpunk dragon in neon city"</SamplePrompt>
          </SampleCard>
          <SampleCard delay={0.4}>
            <SampleImage>🌌</SampleImage>
            <SamplePrompt>"Abstract galaxy with golden spirals"</SamplePrompt>
          </SampleCard>
          <SampleCard delay={0.6}>
            <SampleImage>🦋</SampleImage>
            <SamplePrompt>"Butterfly made of stained glass"</SamplePrompt>
          </SampleCard>
        </SampleGallery>
      </Section>

      <Section>
        <SectionTitle>Why Choose Our AI Generator?</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon delay={0}>🎨</FeatureIcon>
            <FeatureTitle>AI-Powered Creation</FeatureTitle>
            <FeatureText>
              Advanced neural networks bring your textual descriptions to life with incredible detail and creativity. Every image is unique and tailored to your vision.
            </FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon delay={0.5}>⚡</FeatureIcon>
            <FeatureTitle>Lightning Fast</FeatureTitle>
            <FeatureText>
              Generate high-quality images in seconds. No waiting, no delays - just instant creative satisfaction with professional results.
            </FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon delay={1}>🎯</FeatureIcon>
            <FeatureTitle>Limitless Possibilities</FeatureTitle>
            <FeatureText>
              From photorealistic portraits to abstract art, create anything your mind can imagine with precision and artistic flair.
            </FeatureText>
          </FeatureCard>
        </FeatureGrid>
      </Section>
    </Container>
  );
};

export default Home;