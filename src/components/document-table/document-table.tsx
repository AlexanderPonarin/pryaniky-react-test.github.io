import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Box,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { DocumentsType, DocumentType } from '../../types/document';
import { formatDateTime } from '../../utils/format-date-time';
import DocumentModal from '../../modals/document-modal/document-modal';
import DocumentDeleteDialog from '../document-delete-dialog/document-delete-dialog';
import { useAppSelector } from '../../store/redux/hooks';
import Loader from '../loader/loader';
import { RequestStatus } from '../../types/request-status';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import React from 'react';
import DocumentCard from '../document-card/document-card';

const HEAD_ROW_ITEMS = [
  'Номер сотрудника',
  'Тип документа',
  'Название документа',
  'Статус документа',
  'Подпись компании',
  'Подпись сотрудника',
];

interface DocumentProps {
  [key: string]: string | number | Date | null;
}

export default function DocumentTable() {
  const documentsReauestStatus = useAppSelector((state) => state.documents.documents.status);
  const documents = useAppSelector((state) => state.documents.documents.items);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [documentsData, setDocumentsData] = useState<DocumentsType>([]);
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const getSearchingDocuments = (documents: DocumentsType, query: string): DocumentsType => {
    if (!query) {
      return documents;
    } else {
      return documents.filter((document: DocumentProps) => {
        for (const key in document) {
          if (typeof document[key] === 'string' && document[key].toLowerCase().includes(query.toLowerCase())) {
            return document;
          }
          if (typeof document[key] === 'number' && String(document[key]).toLowerCase().includes(query.toLowerCase())) {
            return document;
          }
          if (typeof document[key] === 'object') {
            console.log(document[key]);
          }
          if (
            document[key] !== null &&
            formatDateTime(new Date(document[key])).toLowerCase().includes(query.toLowerCase())
          ) {
            return document;
          }
        }
      });
    }
  };

  const onSearchQueryChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(evt.target.value);
  };

  useEffect(() => {
    setDocumentsData(getSearchingDocuments(documents, searchQuery));
  }, [searchQuery, documents]);

  if (documentsReauestStatus === RequestStatus.LOADING) {
    return <Loader />;
  }

  const createTableHeadRow = (items: string[], isDesktop: boolean) => {
    if (!isDesktop) {
      return '';
    }
    return (
      <TableRow>
        {items.map((item) => (
          <TableCell align="right" key={item}>
            {item}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const createDesktopTableRow = (document: DocumentType) => {
    return (
      <TableRow key={document.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="right">{document.employeeNumber}</TableCell>
        <TableCell align="right">{document.documentType}</TableCell>
        <TableCell align="right">{document.documentName}</TableCell>
        <TableCell align="right">{document.documentStatus}</TableCell>
        <TableCell align="right">
          {document.companySignatureName}{' '}
          {document.companySigDate && document.companySignatureName
            ? `от ${formatDateTime(document?.companySigDate)}`
            : ''}
        </TableCell>
        <TableCell align="right">
          {document.employeeSignatureName}{' '}
          {document.employeeSigDate && document.employeeSignatureName
            ? `от ${formatDateTime(document?.employeeSigDate)}`
            : ''}
        </TableCell>
        <TableCell sx={{ maxWidth: '100px' }} align="right">
          {
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: { sx: 0, md: 1 } }}>
              <DocumentModal document={document} />
              <DocumentDeleteDialog documentID={document.id} />
            </Box>
          }
        </TableCell>
      </TableRow>
    );
  };

  const createTableBodyRows = (documents: DocumentsType, isDesktop: boolean) => {
    return documents.map((document) =>
      isDesktop ? createDesktopTableRow(document) : <DocumentCard key={document.id} document={document} />,
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Box
        sx={{
          ml: { xs: 2, sm: 0 },
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'flex-start', lg: 'center' },
          justifyContent: 'flex-start',
          gap: { sx: 1, sm: 2 },
          width: '90%',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
          },
        }}
      >
        <DocumentModal document={null} />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '60%' }}>
          <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            onChange={onSearchQueryChange}
            id="input-with-sx"
            label="Поиск по ключевым словам"
            variant="standard"
            sx={{ width: { xs: '100%', sm: '250px', md: '250px', lg: '250px' } }}
          />
        </Box>
      </Box>
      <TableContainer sx={{ borderRadius: '10px' }} component={Paper}>
        <Table stickyHeader size="small" aria-label="simple table">
          <TableHead>{createTableHeadRow(HEAD_ROW_ITEMS, isDesktop)}</TableHead>
          <TableBody>{createTableBodyRows(documentsData, isDesktop)}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
