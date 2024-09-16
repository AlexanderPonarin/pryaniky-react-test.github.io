import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { documentsReducer } from './slices/documents';
import { errorHandlerMiddleware } from './middleware/error-handler-middleware';
import { successHandlerMiddleware } from './middleware/success-handler-middleware';
import { authReducer } from './slices/auth';
import { authHandlerMiddleware } from './middleware/auth-handler-middleware';

const store = configureStore({
  reducer: {
    documents: documentsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(errorHandlerMiddleware)
      .concat(successHandlerMiddleware)
      .concat(authHandlerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
