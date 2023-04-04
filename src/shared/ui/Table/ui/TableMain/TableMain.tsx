import { ProcessedProcOrdersData } from 'entities/ProcOrders';
import { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { TableDataAlign, TableDataTextSize, TableHeaders } from '../../model/table.types';
import './TableMain.module.scss';

type rowType = ProcessedProcOrdersData;

type TableMainProps = {
    className?: string;
    headers: TableHeaders[];
    data?: rowType[];
    textAlign?: TableDataAlign;
    textSize?: TableDataTextSize;
    tdRow?: ReactNode;
    caption?: string;
}

export const TableMain = (props: TableMainProps) => {
	const {
		className, headers, data, tdRow, caption,
		textAlign = TableDataAlign.LEFT,
		textSize = TableDataTextSize.MEDIUM,
	} = props;

	console.log(typeof data);

	if (!data) {
		return (
			<div className={classNames('table', {}, [className])}>
                Нет данных...
			</div>
		);
	}


	return (
		<table className={classNames('table', {}, [className])}>
			{caption ? <caption>{caption}</caption> : null}
			<thead>
				<tr>
					{headers && headers.map(header => (
						<th key={header.key}>
							<div>{header.value}</div>
						</th>
					))}
				</tr>
				<tr>
					{headers && headers.map(header => (
						<th key={header.key}>
							<div>Filter...</div>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data && data.map((row: rowType) => (
					<tr key={row.id} >
						{headers && headers.map(header => (
							<td
								key={header.key}
								className={`td ${header.textAlign}`}
								// @ts-ignore
							>{row[header.key]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
