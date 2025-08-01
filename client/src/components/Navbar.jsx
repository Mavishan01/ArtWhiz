import React from 'react'
import styled from 'styled-components'
import Button from './button';
import { AddRounded, ExploreRounded } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
    flex: 1;
    background: ${({ theme }) => theme.navbar };
    color: ${({ theme }) => theme.text_primary};
    font-weight: bold;
    font-size: 22px;
    padding: 14px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 10px rgba(O, O, O, 0.15);
    @media only screen and (max-width: 600px) {
      padding: 10px 12px;
    }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <Container>
      ImgGen
      {
        path[1] === "post" ? (

        <Button onClick={() => navigate("/")}
          text="Explore Posts" 
          leftIcon={<ExploreRounded />}
          type="secondary"
        />
        )  : (
        <Button onClick={() => navigate("/post")}
          text="Create New Post" 
          leftIcon={<AddRounded />} 
          />
      )}

    </Container>
  );
}

export default Navbar
