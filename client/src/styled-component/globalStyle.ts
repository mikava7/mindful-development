import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, theme } from './theme.ts';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3 {

    font-size: 2rem;
  }

  p {
    margin: 0;
    padding: 0;

  }
`;
