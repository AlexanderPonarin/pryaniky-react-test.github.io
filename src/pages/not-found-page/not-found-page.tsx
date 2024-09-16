import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <Container
        sx={{
          gap: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
          height: '100%',
        }}
        maxWidth="md"
        className="py-16"
      >
        <Box
          sx={{ maxWidth: { xs: 200, sm: 200, md: 400, lg: 600, xl: 700 } }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <img style={{ maxWidth: '100%' }} src="/images/not-found-image.jpg" alt="Not Found" className="mb-4" />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 100, fontWeight: 'bold', textAlign: 'center', mb: 2, color: '#BEE6D6' }}>
            404
          </Typography>
          <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
            К сожалению, страница не найдена
          </Typography>
          <Link to="/">
            <Button sx={{ mt: 2 }} variant="contained">
              Перейти на главную страницу
            </Button>
          </Link>
        </Box>
      </Container>
    </main>
  );
}
