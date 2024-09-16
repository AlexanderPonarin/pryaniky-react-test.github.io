import { useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../store/redux/hooks';
import { setTokenStatus } from '../store/redux/slices/auth';
import { TokenStatus } from '../types/token-status';

type Props = {
  navigate: NavigateFunction;
};

export const useCheckAuth = ({ navigate }: Props) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      dispatch(setTokenStatus(TokenStatus.EXPIRED));
    }
    if (token) {
      dispatch(setTokenStatus(TokenStatus.ACTIVE));
    }
  }, [dispatch, navigate, token]);
};
