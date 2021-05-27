import { format as dateFnsFormat } from 'date-fns';
import { fr } from 'date-fns/locale';

export const format = (dateString: number | Date, formatString: string) => {
  return dateFnsFormat(dateString, formatString, {
    locale: fr,
  });
};
