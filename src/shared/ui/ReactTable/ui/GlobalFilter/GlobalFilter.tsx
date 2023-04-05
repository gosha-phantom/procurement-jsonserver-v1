
import classes from './GlobalFilter.module.scss';

interface GlobalFilterProps {
    filter: string;
    setFilter: (value: string) => void;
}

export const GlobalFilter = (props: GlobalFilterProps) => {
	const { filter = '', setFilter } = props;

	return (
		<div className={classes.GlobalFilter}>
            Поиск:
			<input
				type="text"
				value={filter}
				onChange={(e) => {
					setFilter(e.target.value);
				}}
			/>
		</div>
	);
};
