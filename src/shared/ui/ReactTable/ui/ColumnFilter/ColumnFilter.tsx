import { HeaderGroup } from 'react-table';
import classes from './ColumnFilter.module.scss';

interface ColumnFilterProps {
    // filter: string;
    // setFilter: (value: string) => void;
    column: HeaderGroup;
}

export const ColumnFilter = (props: ColumnFilterProps) => {
	const { column } = props;
	// @ts-ignore
	const { filterValue = '', setFilter } = column;

	return (
		<input
			className={classes.input}
			type="text"
			value={filterValue}
			onChange={(e) => setFilter(e.target.value)}
		/>
	);
};
