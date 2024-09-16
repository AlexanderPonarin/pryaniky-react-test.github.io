import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/redux/hooks';
import { useEffect } from 'react';
import { setErrorMsg, setSuccessMsg } from '../store/redux/slices/auth';

export const useShowMessage = () => {
  const dispatch = useAppDispatch();
  const errorMsg = useAppSelector((state) => state.auth.data.errorMsg);
  const successMsg = useAppSelector((state) => state.auth.data.successMsg);
  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      dispatch(setErrorMsg(null));
    }
    if (successMsg) {
      toast.success(successMsg);
      dispatch(setSuccessMsg(null));
    }
  });
};
