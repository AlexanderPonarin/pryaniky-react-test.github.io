import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../axios';
import { RequestStatus } from '../../../types/request-status';
import { TokenStatus } from '../../../types/token-status';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (authData: { username: string; password: string }) => {
    const data = await axios.post('/ru/data/v3/testmethods/docs/login', authData);
    return data;
  },
);

type initialStateType = {
  data: {
    tokenStatus: TokenStatus | null;
    errorMsg: string | null;
    successMsg: string | null;
  };
  status: RequestStatus;
};

const initialState: initialStateType = {
  data: {
    tokenStatus: null,
    errorMsg: null,
    successMsg: null,
  },
  status: RequestStatus.LOADING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data.tokenStatus = null;
    },
    setTokenStatus: (state, action) => {
      state.data.tokenStatus = action.payload;
    },

    setSuccessMsg: (state, action) => {
      state.data.successMsg = action.payload;
    },

    setErrorMsg: (state, action) => {
      state.data.errorMsg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = RequestStatus.LOADING;
        state.data.errorMsg = null;
      })
      .addCase(fetchAuth.fulfilled, (state) => {
        state.status = RequestStatus.LOADED;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = RequestStatus.ERROR;
      });
  },
});

export const selectIsAuth = (state: initialStateType) => state.data;
export const authReducer = authSlice.reducer;
export const { logout, setTokenStatus, setSuccessMsg, setErrorMsg } = authSlice.actions;
