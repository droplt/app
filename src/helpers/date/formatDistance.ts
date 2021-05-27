import { formatDistance as dateFnsFormatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDistance = (date1: number | Date, date2: number | Date) => {
  return dateFnsFormatDistance(date1, date2, {
    locale: fr,
  });
};
