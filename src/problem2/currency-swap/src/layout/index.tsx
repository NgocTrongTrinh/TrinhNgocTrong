import { Container, Box } from "@mui/material";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: 'none',
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: 3,
          borderRadius: 2,
          background: 'none',
       
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default MainLayout;
