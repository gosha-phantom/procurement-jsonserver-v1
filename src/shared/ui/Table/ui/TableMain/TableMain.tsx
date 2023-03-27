import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { TableHeaders } from '../../model/table.types';
import classes from './TableMain.module.scss';

interface TableMainProps {
    className?: string;
    headers: TableHeaders[];
    data?: never[];
}

export const TableMain = memo((props: TableMainProps) => {
	const {
		className, headers, data
	} = props;

	if (!data) {
		return (
			<div className={classNames(classes.table, {}, [className])}>
				Нет данных...
			</div>
		);
	}

	return (
		<table className={classNames(classes.table, {}, [className])}>
			<thead>
				<tr className={classes.tr}>
					{headers && headers.map(header => (
						<th className={classes.th} key={header.key}>
							<div>{header.value}</div>
							<div>Filter...</div>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data && data.map((row, index) => (
					<tr key={index} className={classes.tr}>
						{headers && headers.map(header => (
							<td
								key={header.key}
								className={classNames(classes.td, { [classes[header.textAlign]]: true }, [])}
							>{row[header.key]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
});
