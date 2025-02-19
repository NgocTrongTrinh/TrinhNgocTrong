import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { theme } from './configs';
import Container from './components';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            background: "linear-gradient(135deg, #1E3A8A, #9333EA, #F43F5E)",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />
      <Container />
    </ThemeProvider>
  </StrictMode>
);