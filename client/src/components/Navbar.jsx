import React from 'react';
import styled from 'styled-components';
import { ExploreRounded, HomeRounded, AccountCircleRounded, CollectionsRounded, CreateRounded } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  font-size: 22px;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media only screen and (max-width: 768px) {
    padding: 12px 20px;
    font-size: 20px;
  }
  
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
    font-size: 18px;
  }
`;

const Logo = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media only screen and (max-width: 768px) {
    gap: 15px;
  }
  
  @media only screen and (max-width: 600px) {
    gap: 10px;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme, active }) => active ? theme.primary : theme.text_secondary};
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background: ${({ theme }) => theme.primary}15;
    color: ${({ theme }) => theme.primary};
  }
  
  @media only screen and (max-width: 600px) {
    padding: 6px 8px;
    font-size: 12px;
    gap: 4px;
    
    span {
      display: none;
    }
  }
`;


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1] || "home";


  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        ImgGen AI
      </Logo>
      
      {/* Desktop Navigation */}
      <NavLinks>
        <NavButton 
          active={path === "home" || path === ""}
          onClick={() => navigate("/")}
        >
          <HomeRounded fontSize="small" />
          <span>Home</span>
        </NavButton>
        
        <NavButton 
          active={path === "explore"}
          onClick={() => navigate("/explore")}
        >
          <ExploreRounded fontSize="small" />
          <span>Explore</span>
        </NavButton>
        
        <NavButton 
          active={path === "my-creations"}
          onClick={() => navigate("/my-creations")}
        >
          <CollectionsRounded fontSize="small" />
          <span>My Creations</span>
        </NavButton>

        <NavButton 
          active={path === "createPost"}
          onClick={() => navigate("/createPost")}
        >
          <CreateRounded fontSize="small" />
          <span>Create Post</span>
        </NavButton>
        
        <NavButton 
          active={path === "profile"}
          onClick={() => navigate("/profile")}
        >
          <AccountCircleRounded fontSize="small" />
          <span>Profile</span>
        </NavButton>
        
      </NavLinks>
      
    </Container>
  );
};

export default Navbar;