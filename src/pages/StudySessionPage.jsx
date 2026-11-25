import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function StudySessionPage() {
  const { deckId } = useParams();
  return <Typography variant="h1">Study Session: {deckId}</Typography>;
}