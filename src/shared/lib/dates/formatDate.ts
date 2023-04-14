import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (dt: string) => {
	const formattedDate = format(parseISO(dt), 'eeeeee yyyy-MM-dd', { locale: ru });
	return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1,);
};
