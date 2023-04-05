import { ColumnFilter } from '../ui/ColumnFilter/ColumnFilter';

const capitalize = (value: string) => {
	return value.charAt(0).toUpperCase() + value.slice(1,);
};

export const ReactTableColumnsExample = [
	{ Header: 'User ID', accessor: 'userId', Footer: 'User ID', Filter: ColumnFilter },
	{ Header: 'ID', accessor: 'id', Footer: 'ID', Filter: ColumnFilter },
	{
		Header: 'Title', accessor: 'title', Footer: 'Title',
		Cell: ({ value }: { value: string }) => capitalize(value),
		Filter: ColumnFilter
	},
	{
		Header: 'Description', accessor: 'body', Footer: 'Description',
		Cell: ({ value }: { value: string }) => capitalize(value),
		Filter: ColumnFilter,
		disableFilters: true,
	},
];
