import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h1" gutterBottom>
        404 — Page Not Found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The page or deck you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Back to Dashboard
      </Button>
    </Box>
  );
}