import { Article } from '@mui/icons-material';
import { Card, CardHeader, Icon, CardActions, Collapse, CardContent, Box, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import React from 'react';
import DocumentModal from '../../modals/document-modal/document-modal';
import { DocumentStatus } from '../../types/document';
import { formatDateTime } from '../../utils/format-date-time';
import DocumentDeleteDialog from '../document-delete-dialog/document-delete-dialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { DocumentType } from '../../types/document';

type DocumentCardProps = {
  document: DocumentType;
};

interface ExpandMoreProps {
  expand: boolean;
  onClick: () => void;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <ExpandMoreIcon {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function DocumentCard({ document }: DocumentCardProps): JSX.Element {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardHeader
          avatar={
            <Icon>
              <Article sx={{ color: document.documentStatus === DocumentStatus.SIGNED ? green[500] : red[500] }} />
            </Icon>
          }
          action={
            <CardActions>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              />

              <DocumentModal document={document} />
              <DocumentDeleteDialog documentID={document.id} />
            </CardActions>
          }
          title={`Сотрудник №${document.employeeNumber}`}
          subheader={document.documentType}
        />

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box>
              <Typography variant="body2" sx={{ color: 'text.main' }}>
                Название документа
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{document.documentName || 'Документ'}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: 'text.main' }}>
                Статус документа
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{document.documentStatus || 'Нет статуса'}</Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: 'text.main' }}>
                Подпись компании
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {document.companySignatureName ? document.companySignatureName : 'Нет подписи'}{' '}
                {document.companySigDate && document.employeeSigDate && `от ${formatDateTime(document.companySigDate)}`}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: 'text.main' }}>
                Подпись сотрудника
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {document.employeeSignatureName ? document.employeeSignatureName : 'Нет подписи'}{' '}
                {document.employeeSigDate &&
                  document.companySigDate &&
                  `от ${formatDateTime(document.employeeSigDate)}`}
              </Typography>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
