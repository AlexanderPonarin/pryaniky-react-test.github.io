import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, MenuItem, TextField, Tooltip } from '@mui/material';
import { DocumentStatus, HRDocumentType, DocumentType } from '../../types/document';
import { useForm, FieldValues } from 'react-hook-form';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import { fetchCreateDocument, fetchDocuments, fetchPatchDocument } from '../../store/redux/slices/documents';
import { toast } from 'react-toastify';
import { RequestStatus } from '../../types/request-status';
import Loader from '../../components/loader/loader';
import Edit from '@mui/icons-material/Edit';
import { Add } from '@mui/icons-material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, md: 600 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 2, md: 4 },
};

const documentStatusOptions: DocumentStatus[] = [
  DocumentStatus.SIGNED,
  DocumentStatus.IN_PROCESS,
  DocumentStatus.NOT_SIGNED,
];

type DocumentModalProps = {
  document?: DocumentType | null;
};

const documentTypeOptions: HRDocumentType[] = [HRDocumentType.EMPLOYMENT_CONTRACT, HRDocumentType.ORDER_FOR_ADMISSION];

export default function DocumentModal({ document }: DocumentModalProps) {
  const dispatch = useAppDispatch();
  const requuestStatus = useAppSelector((state) => state.documents.documents.status);
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  const [employeeSigDate, setEmployeeSigDate] = React.useState<Date | null>(document ? document.employeeSigDate : null);
  const [companySigDate, setCompanySigDate] = React.useState<Date | null>(document ? document.companySigDate : null);
  const handleOpen = () => setOpen(true);
  const newDocumentRequestStatus = useAppSelector((state) => state.documents.documents.status);
  const updateDocumentRequestStatus = useAppSelector((state) => state.documents.documents.status);
  const isLoadingRequest =
    requuestStatus === RequestStatus.LOADING ||
    newDocumentRequestStatus === RequestStatus.LOADING ||
    updateDocumentRequestStatus === RequestStatus.LOADING;

  const handleClose = () => {
    setOpen(false);
    setEmployeeSigDate(document ? document.employeeSigDate : null);
    setCompanySigDate(document ? document.companySigDate : null);
    reset();
  };

  const onSubmit = (values: FieldValues) => {
    try {
      const documentData = {
        ...(values as DocumentType),
        employeeSigDate: employeeSigDate ? employeeSigDate : null,
        companySigDate: companySigDate ? companySigDate : null,
        id: document?.id ? document.id : '',
      };
      if (document) {
        dispatch(fetchPatchDocument(documentData)).then(() => dispatch(fetchDocuments()));
      }
      if (!document) {
        dispatch(fetchCreateDocument(documentData)).then(() => dispatch(fetchDocuments()));
      }
    } catch (error) {
      if (document) {
        toast.error(`Не удалось отредактировать документ ${error}`);
      } else {
        toast.error(`Не удалось создать документ ${error}`);
      }
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <Tooltip title={document ? 'Редактировать' : 'Создать'}>
        {document ? (
          <IconButton sx={{ color: 'primary.main' }} size="small" onClick={handleOpen}>
            <Edit />
          </IconButton>
        ) : (
          <Button onClick={handleOpen} variant="contained" startIcon={<Add />}>
            Создать документ
          </Button>
        )}
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={style}>
          {isLoadingRequest && <Loader />}

          <Typography id="modal-modal-title" variant="h6" component="h2">
            {document ? 'Редактирование документа' : 'Создание документа'}
          </Typography>
          <TextField
            {...register('employeeNumber')}
            fullWidth
            size="small"
            required
            id="outlined-required"
            label="Номер сотрудника"
            defaultValue={document ? document.employeeNumber : ''}
          />
          <TextField
            {...register('documentName')}
            size="small"
            required
            id="outlined-required"
            label="Название документа"
            defaultValue={document ? document.documentName : ''}
          />
          <TextField
            {...register('employeeSignatureName')}
            size="small"
            id="outlined-required"
            label="Подпись сотрудника"
            defaultValue={document ? document.employeeSignatureName : ''}
          />
          <TextField
            {...register('companySignatureName')}
            size="small"
            id="outlined-required"
            label="Подпись компании"
            defaultValue={document ? document.companySignatureName : ''}
          />
          <TextField
            {...register('documentStatus')}
            size="small"
            id="outlined-select-currency"
            select
            required
            label="Статус документа"
            defaultValue={document ? document.documentStatus : ''}
          >
            {documentStatusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            {...register('documentType')}
            size="small"
            id="outlined-select-currency"
            select
            required
            label="Тип документа"
            defaultValue={document ? document.documentType : ''}
          >
            {documentTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                defaultValue={employeeSigDate ? dayjs(employeeSigDate) : null}
                sx={{ width: '100%' }}
                onChange={(value: Dayjs | null) => {
                  if (value !== null) {
                    const date = value.toDate();
                    setEmployeeSigDate(date);
                  }
                }}
                label="Дата подписания работнгиком"
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                defaultValue={companySigDate ? dayjs(companySigDate) : null}
                sx={{ width: '100%' }}
                onChange={(value: Dayjs | null) => {
                  if (value !== null) {
                    const date = value.toDate();
                    setCompanySigDate(date);
                  }
                }}
                label="Дата подписания компанией"
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button disabled={isLoadingRequest} type="submit">
            {document ? 'Редактировать' : 'Создать'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
