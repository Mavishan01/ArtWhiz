import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPaintBrush } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

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
    text-shadow: 0 0 5px ${props => props.theme?.secondary || '#B300FF'}40;
  }
  50% {
    text-shadow: 0 0 20px ${props => props.theme?.secondary || '#B300FF'}60, 0 0 30px ${props => props.theme?.secondary || '#B300FF'}40;
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
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

const LoginCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary}15;
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px ${({ theme }) => theme.shadow};
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 480px) {
    padding: 36px 28px;
    border-radius: 20px;
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 32px;
  animation: ${float} 3s ease-in-out infinite;
`;

const LogoIcon = styled.div`
  font-size: 48px;
  filter: drop-shadow(0 4px 8px ${({ theme }) => theme.shadow});
`;

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, ${({ theme }) => theme.secondary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${glow} 3s ease-in-out infinite;
  margin: 0;
  letter-spacing: 0.5px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  text-align: center;
  margin: 8px 0 32px 0;
  line-height: 1.5;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

const Input = styled.input`
  background: ${({ theme }) => theme.bgLight};
  border: 2px solid ${({ theme }) => theme.text_secondary}20;
  border-radius: 12px;
  padding: 16px 18px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}60;
  }

  &:hover {
    border-color: ${({ theme }) => theme.text_secondary}40;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border: none;
  padding: 18px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  box-shadow: 0 4px 15px ${({ theme }) => theme.primary}30;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.primary}40;
  }
  
  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SignupLink = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-top: 24px;
  font-size: 14px;

  span {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.secondary};
      text-shadow: 0 0 8px ${({ theme }) => theme.secondary}40;
    }
  }
`;

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      console.log("Login success:", data);

      // Optionally store token or navigate
      // localStorage.setItem("token", data.token);
      navigate("/explore");

    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <LoginCard>
        <LogoContainer>
          <LogoIcon>
            <FaPaintBrush />
          </LogoIcon>
          <LogoText>AI Creator</LogoText>
        </LogoContainer>
        
        <Subtitle>
          Welcome back! Login to continue creating amazing visuals.
        </Subtitle>

        <Form>
          <InputGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </InputGroup>

          <LoginButton onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </LoginButton>
        </Form>

        <SignupLink>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </SignupLink>
      </LoginCard>
    </Container>
  );
};

export default Login;