import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

export default function AppLayout({ children }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Sankara EyeCare Pro</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>{children}</Container>
    </Box>
  );
}
