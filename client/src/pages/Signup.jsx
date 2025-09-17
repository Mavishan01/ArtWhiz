import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPaintBrush } from "react-icons/fa";

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
  justify-content: center;
  align-items: flex-start;
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

const SignupCard = styled.div`
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
  margin: 20px 0;

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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 8px;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.text_secondary}40;
  border-radius: 4px;
  background: ${({ theme }) => theme.bgLight};
  cursor: pointer;
  position: relative;
  margin-top: 2px;
  transition: all 0.3s ease;

  &:checked {
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    border-color: ${({ theme }) => theme.primary};
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const CheckboxLabel = styled.label`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.secondary};
      text-shadow: 0 0 8px ${({ theme }) => theme.secondary}40;
    }
  }
`;

const SignupButton = styled.button`
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

const LoginLink = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-top: 24px;
  font-size: 14px;

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.secondary};
      text-shadow: 0 0 8px ${({ theme }) => theme.secondary}40;
    }
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);
    
    try {
    const res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();
    setIsLoading(false);

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    console.log("Signup success:", data);
    alert("Account created successfully!");

    // Optionally redirect to login page
    // navigate("/login");
  } catch (error) {
    setIsLoading(false);
    console.error("Error signing up:", error);
    alert("Something went wrong. Please try again.");
  }
  };

  return (
    <Container>
      <SignupCard>
        <LogoContainer>
          <LogoIcon>
            <FaPaintBrush />
          </LogoIcon>
          <LogoText>AI Creator</LogoText>
        </LogoContainer>
        
        <Subtitle>
          Join thousands of creators and start bringing your ideas to life.
        </Subtitle>

        <Form>
          <InputGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </InputGroup>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </InputGroup>

          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <CheckboxLabel htmlFor="agreeToTerms">
              I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
            </CheckboxLabel>
          </CheckboxContainer>

          <SignupButton onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </SignupButton>
        </Form>

        <LoginLink>
          Already have an account? <a href="#login">Login</a>
        </LoginLink>
      </SignupCard>
    </Container>
  );
};

export default Signup;