import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function DeckDetailPage() {
  const { deckId } = useParams();
  return <Typography variant="h1">Deck Detail: {deckId}</Typography>;
}