import styled from "styled-components";

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: white;
  padding-top: 10px;
  overflow-x: hidden
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 10px 20px;
`;

export const BackLink = styled.span`
  font-size: 1rem;
  color: #008dc4;
  margin-left: 20px;
  cursor: pointer;
  font-family: "Overpass", sans-serif;
  &:hover {
    text-decoration: underline;
  }
`;

export const Image = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

export const RoleSelectionContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const RoleOption = styled.div`
  padding: 0.5rem 1rem;
  border: 1px solid #008dc4;
  border-radius: 4px;
  background-color: ${(props) => (props.selected ? "#008dc4" : "white")};
  color: ${(props) => (props.selected ? "white" : "#008dc4")};
  cursor: pointer;
  &:hover {
    background-color: #006fa2;
    color: white;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-family: "Overpass", sans-serif;
`;

export const Input = styled.input`
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #008dc4;
  outline: none;
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#f0f0f0" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  &:focus {
    border-color: #006fa2;
  }
`;

export const PasswordContainer = styled.div`
  position: relative;
  align-items: center;
`;

export const PasswordToggleIcon = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #008dc4;
`;

export const Button = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #008dc4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #006fa2;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  input {
    margin-right: 10px;
  }

  label {
    font-size: 0.9rem;
    color: #666;
    font-family: "Overpass", sans-serif;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
  font-family: "Overpass", sans-serif;
`;

export const PasswordRequirements = styled.div`
  font-size: 0.8rem;
  margin-top: 5px;
  margin-bottom: 10px;

  p {
    margin: 2px 0;
  }
`;