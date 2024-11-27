import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #03658b;
  margin: 0;
`;

export const CardLocation = styled.div`
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    color: #008dc4;
  }
`;

export const CardInfo = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

export const ViewMoreButton = styled.button`
  margin-top: auto;
  align-self: flex-end;
  background-color: #008dc4;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005f89;
  }
`;
