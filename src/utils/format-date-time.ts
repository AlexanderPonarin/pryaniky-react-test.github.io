import dayjs from 'dayjs';

export const formatDateTime = (dateString: Date | null): string => {
  if (dateString === null) {
    return '';
  } else {
    return dayjs(dateString).format('DD.MM.YYYY');
  }
};
