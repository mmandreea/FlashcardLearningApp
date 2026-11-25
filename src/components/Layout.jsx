import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import StyleIcon from '@mui/icons-material/Style';
import { Link as RouterLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar component="nav" aria-label="Main navigation">
          <StyleIcon sx={{ mr: 1 }} aria-hidden="true" />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Flashcard Studio
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Decks
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}