import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

type FormatDateOptions = {
    formatType?: string;
    firstLetterUpperCase?: boolean;
}

export const formatDate = (dt: Date, options: FormatDateOptions = {}) => {
	const {
		formatType = 'eeeeee yyyy-MM-dd',
		firstLetterUpperCase = true
	} = options;

	let formattedDate = format(parseISO(dt.toISOString()), formatType, { locale: ru });
	if (firstLetterUpperCase) {
		formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1,);
	}
	return formattedDate;
};
