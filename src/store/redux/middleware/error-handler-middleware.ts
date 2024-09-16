import { isFulfilled, isRejected, Middleware } from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';
import { setErrorMsg, setTokenStatus } from '../slices/auth';

interface Payload {
  data: {
    error_code: number;
  };
}

export const errorHandlerMiddleware: Middleware = (store) => (next) => (action: unknown) => {
  if (isRejected(action)) {
    store.dispatch(setErrorMsg(action.error.message));
    if (action.type === 'documents/fetchDocuments/rejected') {
      store.dispatch(setErrorMsg('Не удалось загрузить документы'));
    }
    if (action.type === 'documents/fetchRemoveDocument/rejected') {
      store.dispatch(setErrorMsg('Не удалось удалить документ'));
    }
    if (action.type === 'documents/fetchPatchDocument/rejected') {
      store.dispatch(setErrorMsg('Не удалось отредактировать документ'));
    }
    if (action.type === 'documents/fetchCreateDocument/rejected') {
      store.dispatch(setErrorMsg('Не удалось создать документ'));
    }
  }

  if (isFulfilled(action) && (action.payload as Payload)?.data.error_code === 2004) {
    if (action.type === 'auth/fetchAuth/fulfilled') {
      store.dispatch(setErrorMsg('Неверное имя или пароль'));
    } else {
      store.dispatch(setErrorMsg('Необходимо авторизоваться'));
      store.dispatch(setTokenStatus('expired'));
    }
  }

  return next(action);
};
