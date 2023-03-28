import { memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { TableHeaders, TableDataAlign, TableDataTextSize } from '../../model/table.types';
import './TableMain.module.scss';

interface TableMainProps {
    className?: string;
    headers: TableHeaders[];
    data?: any[];
    textAlign?: TableDataAlign;
    textSize?: TableDataTextSize;
    tdRow?: ReactNode;
}

export const TableMain = memo((props: TableMainProps) => {
	const {
		className, headers, data, tdRow,
		textAlign = TableDataAlign.LEFT,
		textSize = TableDataTextSize.MEDIUM,
	} = props;

	if (!data) {
		return (
			<div className={classNames('table', {}, [className])}>
				Нет данных...
			</div>
		);
	}

	return (
		<table className={classNames('table', {}, [className])}>
			<thead>
				<tr>
					{headers && headers.map(header => (
						<th key={header.key}>
							<div>{header.value}</div>
							{/*<div>Filter...</div>*/}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data && data.map((row, index) => (
					<tr key={index} >
						{headers && headers.map(header => (
							<td
								key={header.key}
								className={`td ${header.textAlign}`}
							>{row[header.key]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
});
