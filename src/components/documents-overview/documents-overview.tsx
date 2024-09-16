import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DocumentsOverview() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2 }}>
        <Card sx={{ maxWidth: { xs: 150, sm: 150, md: 200, lg: 250, xl: 300 } }}>
          <CardMedia
            sx={{ height: { xs: 80, sm: 150, md: 150, lg: 150, xl: 200 } }}
            image="https://e7.pngegg.com/pngimages/506/98/png-clipart-google-docs-spreadsheet-microsoft-excel-google-drive-computer-icons-data-sheet-text-computer.png"
            title="document-table"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Таблица договоров
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Возможность для просмотра, редактирования и удаления договоров
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/documents/table">
              <Button size="small">Перейти</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}
