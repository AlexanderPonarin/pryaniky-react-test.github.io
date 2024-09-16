import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from './pages/auth-page/auth-page';
import MainPage from './pages/main-page/main-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from './store/redux/hooks';
import { useEffect } from 'react';
import { fetchDocuments } from './store/redux/slices/documents';
import DocumentPage from './pages/documents-page/documentsPage';
import Layout from './components/layout/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DocumentTable from './components/document-table/document-table';
import { useCheckAuth } from './hooks/useChackAuth';
import { useShowMessage } from './hooks/useShowMessage';
import { TokenStatus } from './types/token-status';

function App() {
  const dispatch = useAppDispatch();
  const tokenStatus = useAppSelector((state) => state.auth.data.tokenStatus);

  const navigate = useNavigate();

  useShowMessage();
  useCheckAuth({ navigate });

  useEffect(() => {
    if (tokenStatus === TokenStatus.ACTIVE) {
      dispatch(fetchDocuments());
    }
  }, [dispatch, tokenStatus]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="documents" element={<DocumentPage />}>
            <Route path="table" element={<DocumentTable />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
