import { Middleware } from '@reduxjs/toolkit';
import { setSuccessMsg } from '../slices/auth';


interface  ActionProps {
  type: string
  payload: {
    data: {
      data: {
        token: string;
      };
    };
  }
}

export const successHandlerMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  if ( action as ActionProps) {
    if ((action as ActionProps)?.type === 'documents/fetchRemoveDocument/fulfilled') {
      store.dispatch(setSuccessMsg('Документ успешно удален'));
    }
    if ((action as ActionProps)?.type === 'documents/fetchPatchDocument/fulfilled') {
      store.dispatch(setSuccessMsg('Документ успешно отредактирован'));
    }
    if ((action as ActionProps)?.type === 'documents/fetchCreateDocument/fulfilled') {
      store.dispatch(setSuccessMsg('Документ успешно создан'));
    }
    if ((action as ActionProps).type === 'auth/fetchAuth/fulfilled') {
      if ((action as ActionProps).payload?.data?.data?.token) {
        store.dispatch(setSuccessMsg('Авторизация прошла успешно'));
      }
    }
  }

  return next(action);
};
