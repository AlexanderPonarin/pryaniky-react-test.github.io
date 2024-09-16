import { Outlet, useLocation, useOutlet } from 'react-router-dom';
import { useAppSelector } from '../../store/redux/hooks';
import DocumentsOverview from '../../components/documents-overview/documents-overview';
import { useEffect, useState } from 'react';
import { RequestStatus } from '../../types/request-status';
import Loader from '../../components/loader/loader';

export default function DocumentPage() {
  const documentsReauestStatus = useAppSelector((state) => state.documents.documents.status);
  const [isOverviewShow, setIsOverviewShow] = useState(false);
  const location = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    if (!outlet) {
      setIsOverviewShow(true);
    } else {
      setIsOverviewShow(false);
    }
  }, [outlet, location]);

  if (documentsReauestStatus === RequestStatus.LOADING) {
    return <Loader />;
  }

  return isOverviewShow ? <DocumentsOverview /> : <Outlet />;
}
