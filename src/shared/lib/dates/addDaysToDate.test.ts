import { addDaysToDate } from './addDaysToDate';

test('Add 5 days to date', () => {
	const editedDate = addDaysToDate(new Date('2023-05-03'), 5).toLocaleDateString();
	expect(editedDate).toEqual('08.05.2023');
});

test('Add 5 days to date with month changing', () => {
	const editedDate = addDaysToDate(new Date('2023-05-30'), 5).toLocaleDateString();
	expect(editedDate).toEqual('04.06.2023');
});
