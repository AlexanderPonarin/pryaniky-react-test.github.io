import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import { fetchDocuments, fetchRemoveDocument } from '../../store/redux/slices/documents';
import { RequestStatus } from '../../types/request-status';
import { Delete } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

type DocumentDeleteDialogProps = {
  documentID: string;
};

export default function DocumentDeleteDialog({ documentID }: DocumentDeleteDialogProps) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const requuestStatus = useAppSelector((state) => state.documents.documents.status);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      dispatch(fetchRemoveDocument(documentID)).then(() => dispatch(fetchDocuments()));
    } catch (e) {
      console.log(e);
    } finally {
      setOpen(false);
      dispatch(fetchDocuments());
    }
  };
  return (
    <React.Fragment>
      <Tooltip title="Удалить">
        <IconButton sx={{ color: 'red' }} size="small" onClick={handleClickOpen}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Вы уверены что хотите удалить документ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Нет, отменить
          </Button>
          <Button
            disabled={requuestStatus === RequestStatus.LOADING}
            variant="outlined"
            onClick={handleDelete}
            autoFocus
          >
            Да, удалить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
