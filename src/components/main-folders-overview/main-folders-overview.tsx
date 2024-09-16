import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MainFoldersOverview() {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2} flexDirection="column">
      <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
        <Card sx={{ maxWidth: { xs: 150, sm: 150, md: 200, lg: 250, xl: 300 } }}>
          <CardMedia
            sx={{ height: { xs: 80, sm: 150, md: 150, lg: 150, xl: 200 } }}
            image="https://i.pinimg.com/564x/56/78/fb/5678fb3877b15ca70ce4b65a3f0993ed.jpg"
            title="documents"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              Документы
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Раздел для работы с документами организации.
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/documents">
              <Button size="small">Перейти</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}
