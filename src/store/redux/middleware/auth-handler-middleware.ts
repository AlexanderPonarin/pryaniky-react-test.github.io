import 'react-toastify/dist/ReactToastify.css';
import { setTokenStatus } from '../slices/auth';
import { Middleware } from '@reduxjs/toolkit';
import { TokenStatus } from '../../../types/token-status';

interface Payload {
  payload: {
    data: {
      data: {
        token: string;
      };
    };
  };
}

export const authHandlerMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  if (action) {
    if ((action as Payload)?.payload?.data?.data?.token) {
      window.localStorage.setItem('token', (action as Payload).payload?.data?.data.token);
      store.dispatch(setTokenStatus(TokenStatus.ACTIVE));
    }
    return next(action);
  }
  return next(action);
};
