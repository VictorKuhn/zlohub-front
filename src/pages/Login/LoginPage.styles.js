import styled from 'styled-components';

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
    margin: 0px;
    color: #008dc4;
`;

export const Subtitle = styled.p`
    font-family: 'Overpass', sans-serif;
    font-size: 1rem;
    color: #666;
    text-align: center;
    max-width: 300px;
    margin-bottom: 0px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 350px;
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
    margin-bottom: 1rem;
`;

export const LinksContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const LinkText = styled.span`
    font-size: 0.9rem;
    color: #008dc4;
    cursor: pointer;
    text-align: ${(props) => props.align};
    &:hover {
        text-decoration: underline;
    }
`;
