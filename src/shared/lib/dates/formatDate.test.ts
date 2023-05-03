import { formatDate } from './formatDate';

const dt = new Date('2023-05-03');

test('Test format date without any params', () => {
	const formattedDate = formatDate(dt);
	expect(formattedDate).toEqual('Ср 2023-05-03');
});

test('Test format date with lower case', () => {
	const formattedDate = formatDate(dt, { firstLetterUpperCase: false });
	expect(formattedDate).toEqual('ср 2023-05-03');
});

test('Test format date with custom format date-1', () => {
	const formattedDate = formatDate(dt, { formatType: 'yyyy-MM-dd' });
	expect(formattedDate).toEqual('2023-05-03');
});

test('Test format date with custom format date-2', () => {
	const formattedDate = formatDate(dt, { formatType: 'dd.MM.yyyy' });
	expect(formattedDate).toEqual('03.05.2023');
});
