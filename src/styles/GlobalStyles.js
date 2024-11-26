import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        font-family: 'Nunito', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
    }
`;

export default GlobalStyles;
