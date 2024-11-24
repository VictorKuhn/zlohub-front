import styled from 'styled-components';

export const RecoverContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const BackButton = styled.button`
    align-self: flex-start;
    background-color: transparent;
    color: #008dc4;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 10px;
    &:hover {
    text-decoration: underline;
    }
`;

export const Image = styled.img`
    width: 150px;
    height: auto;
    margin-bottom: 10px;
`;

export const Title = styled.h1`
    font-family: 'Overpass', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #008dc4;
    margin-bottom: 5px;
`;

export const Subtitle = styled.p`
    font-family: 'Overpass', sans-serif;
    font-size: 1rem;
    color: #666;
    text-align: center;
    max-width: 300px;
    margin-bottom: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 2rem;
    border-radius: 8px;
    background-color: white;
`;

export const Input = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #008dc4;
    outline: none;
`;

export const Button = styled.button`
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #008dc4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9rem;
    margin-top: -8px; // Aproxima da borda do input
    margin-bottom: 10px;
    text-align: left;
`;