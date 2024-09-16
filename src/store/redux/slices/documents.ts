import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../axios';
import { RequestStatus } from '../../../types/request-status';
import { DocumentsType, DocumentType } from '../../../types/document';

export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async () => {
  const data = await axios.get('/ru/data/v3/testmethods/docs/userdocs/get');
  return data;
});

export const fetchRemoveDocument = createAsyncThunk('documents/fetchRemoveDocument', async (id: string) => {
  await axios.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`);
});

export const fetchCreateDocument = createAsyncThunk(
  'documents/fetchCreateDocument',
  async (documentData: DocumentType) => {
    await axios.post('/ru/data/v3/testmethods/docs/userdocs/create', { ...documentData });
  },
);

export const fetchPatchDocument = createAsyncThunk(
  'documents/fetchPatchDocument',
  async (documentData: DocumentType) => {
    await axios.post(`/ru/data/v3/testmethods/docs/userdocs/set/${documentData.id}`, { ...documentData });
  },
);

type InitialDpcumentsState = {
  documents: {
    items: DocumentsType;
    status: RequestStatus;
  };
};

const initialState: InitialDpcumentsState = {
  documents: {
    items: [],
    status: RequestStatus.LOADING,
  },
};
const documenstSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.documents.status = RequestStatus.LOADING;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.documents.items = action.payload.data.data;
        state.documents.status = RequestStatus.LOADED;
      })
      .addCase(fetchDocuments.rejected, (state) => {
        state.documents.status = RequestStatus.ERROR;
      });
  },
});

export const documentsReducer = documenstSlice.reducer;
