import { formatDistanceToNow as dateFnsFormatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDistanceToNow = (date1: number | Date) => {
  return dateFnsFormatDistanceToNow(date1, {
    locale: fr,
  });
};
