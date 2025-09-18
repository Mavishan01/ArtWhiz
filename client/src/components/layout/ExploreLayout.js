import styled from 'styled-components';
import { SearchRounded, FilterListRounded } from '@mui/icons-material';

export const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.bg};
  padding: 20px;

  @media (max-width: 768px) { padding: 15px; }
  @media (max-width: 480px) { padding: 10px; }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
`;

export const Title = styled.h1`
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

export const SearchSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) { width: 100%; }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary}20;
  border-radius: 25px;
  padding: 8px 16px;
  gap: 8px;
  min-width: 300px;
  flex: 1;

  @media (max-width: 768px) { min-width: 0; }
`;

export const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  flex: 1;

  &::placeholder { color: ${({ theme }) => theme.text_secondary}; }
`;

export const FilterButton = styled.button`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary}20;
  border-radius: 12px;
  padding: 10px 16px;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}10;
  }
`;

export const MasonryGrid = styled.div`
  column-count: 4;
  column-gap: 20px;
  column-fill: balance;

  @media (max-width: 1200px) { column-count: 3; }
  @media (max-width: 768px) { column-count: 2; column-gap: 15px; }
  @media (max-width: 480px) { column-count: 1; column-gap: 0; }
`;

export const CardWrapper = styled.div`
  break-inside: avoid;
  margin-bottom: 20px;
  width: 100%;
  @media (max-width: 768px) { margin-bottom: 15px; }
`;

export const LoadMoreButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 40px auto;
  display: block;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.primary}40;
  }
`;

export const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  background: ${({ theme }) => theme.card};
  padding: 12px 20px;
  border-radius: 12px;
  min-width: 100px;
  box-shadow: 0 2px 6px ${({ theme }) => theme.text_secondary}20;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) { min-width: auto; width: 100%; }
`;

export const StatNumber = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
