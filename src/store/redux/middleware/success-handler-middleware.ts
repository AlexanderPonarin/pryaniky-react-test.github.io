import { Action, Dispatch, Store } from '@reduxjs/toolkit';
import { setSuccessMsg } from '../slices/auth';

type Middleware = (store: Store) => (next: Dispatch) => (action: Action) => void;

interface ActionWithPayload extends Action {
  payload: {
    data: {
      data: {
        token: string;
      };
    };
  };
}

export const successHandlerMiddleware: Middleware = (store) => (next) => (action: Action) => {
  if (action) {
    if (action.type === 'documents/fetchRemoveDocument/fulfilled') {
      store.dispatch(setSuccessMsg('Документ успешно удален'));
    }
    if (action.type === 'documents/fetchPatchDocument/fulfilled') {
      store.dispatch(setSuccessMsg('Документ успешно отредактирован'));
    }
    if (action.type === 'documents/fetchCreateDocument/fulfilled') {
      store.dispatch(setSuccessMsg('Документ успешно создан'));
    }
    if (action.type === 'auth/fetchAuth/fulfilled') {
      if ((action as ActionWithPayload).payload.data?.data?.token) {
        store.dispatch(setSuccessMsg('Авторизация прошла успешно'));
      }
    }
    return next(action);
  }
  return next(action);
};
