import { Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function FirstPost() {
  return (
    <Container>
      <Typography variant='h1'>First Post</Typography>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </Container>
  );
}
