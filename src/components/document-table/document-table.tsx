import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table, Box, TextField } from '@mui/material';
import { DocumentsType, DocumentType } from '../../types/document';
import { formatDateTime } from '../../utils/format-date-time';
import DocumentModal from '../../modals/document-modal/document-modal';
import DocumentDeleteDialog from '../document-delete-dialog/document-delete-dialog';
import { useAppSelector } from '../../store/redux/hooks';
import Loader from '../loader/loader';
import { RequestStatus } from '../../types/request-status';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';

interface DocumentProps extends DocumentType {
  [key: string]: string | number | Date | null;
}

export default function DocumentTable() {
  const documentsReauestStatus = useAppSelector((state) => state.documents.documents.status);
  const documents = useAppSelector((state) => state.documents.documents.items);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [documentsData, setDocumentsData] = useState<DocumentsType>([]);

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', gap: 4, width: '100%' }}>
        <DocumentModal document={null} />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '50%' }}>
          <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            onChange={onSearchQueryChange}
            id="input-with-sx"
            label="Поиск по ключевым словам"
            variant="standard"
            sx={{ width: '50%' }}
          />
        </Box>
      </Box>
      <TableContainer sx={{ borderRadius: '10px' }} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Номер сотрудника</TableCell>
              <TableCell align="right">Тип документа</TableCell>
              <TableCell align="right">Название документа</TableCell>
              <TableCell align="right">Статус документа</TableCell>
              <TableCell align="right">Подпись компании</TableCell>
              <TableCell align="right">Подпись сотрудника</TableCell>
              <TableCell align="right">Дата подписи компании</TableCell>
              <TableCell align="right">Дата подписи сотрудника</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentsData?.map((document) => (
              <TableRow key={document.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{document.employeeNumber}</TableCell>
                <TableCell align="right">{document.documentType}</TableCell>
                <TableCell align="right">{document.documentName}</TableCell>
                <TableCell align="right">{document.documentStatus}</TableCell>
                <TableCell align="right">{document.companySignatureName}</TableCell>
                <TableCell align="right">{document.employeeSignatureName}</TableCell>
                <TableCell align="right">{formatDateTime(document?.companySigDate)}</TableCell>
                <TableCell align="right">{formatDateTime(document?.employeeSigDate)}</TableCell>
                <TableCell align="right">
                  {
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                      <DocumentModal document={document} />
                      <DocumentDeleteDialog documentID={document.id} />
                    </Box>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
