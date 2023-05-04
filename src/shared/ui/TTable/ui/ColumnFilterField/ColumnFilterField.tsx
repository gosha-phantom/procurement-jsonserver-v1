import { Column, Table } from '@tanstack/react-table';
import { useMemo } from 'react';
import ClearIcon from 'shared/assets/icons/delete-left.svg';
import { DebouncedInput, SimpleInputThemeEnum, VStack } from 'shared/ui';
import classes from './ColumnFilterField.module.scss';

interface ColumnFilterFieldProps {
    className?: string;
    column: Column<any, unknown>;
    table: Table<any>;
}

export const ColumnFilterField = (props: ColumnFilterFieldProps) => {
	const { column, table } = props;

	const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
	const columnFilterValue = column.getFilterValue();

	const sortedUniqueValues = useMemo(() => (
		typeof firstValue === 'number'
			? []
			: Array.from(column.getFacetedUniqueValues().keys()).sort()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	), [column.getFacetedUniqueValues()]);

	return typeof firstValue === 'number'
		? (
			<VStack>
				<DebouncedInput
					className={classes.inputNumber}
					theme={SimpleInputThemeEnum.ROUNDED}
					type="number"
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
					value={(columnFilterValue as [number, number])?.[0] ?? ''}
					onChange={value =>
						column.setFilterValue((old: [number, number]) => [value, old?.[1]])
					}
					placeholder={`Мин ${
						column.getFacetedMinMaxValues()?.[0]
							? `(${column.getFacetedMinMaxValues()?.[0]})`
							: ''
					}`}
				/>
				<DebouncedInput
					className={classes.inputNumber}
					theme={SimpleInputThemeEnum.ROUNDED}
					type="number"
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
					value={(columnFilterValue as [number, number])?.[1] ?? ''}
					onChange={value =>
						column.setFilterValue((old: [number, number]) => [old?.[0], value])
					}
					placeholder={`Макс ${
						column.getFacetedMinMaxValues()?.[1]
							? `(${column.getFacetedMinMaxValues()?.[1]})`
							: ''
					}`}
				/>
			</VStack>
		) : (
			<VStack align={'center'} justify={'center'}>
				<datalist id={column.id + '_list'}>
					{sortedUniqueValues.slice(0,1000).map((value: any) => (
						<option value={value} key={value} />
					))}
				</datalist>
				<DebouncedInput
					className={classes.input}
					type="text"
					theme={SimpleInputThemeEnum.ROUNDED}
					value={(columnFilterValue ?? '') as string}
					onChange={value => column.setFilterValue(value)}
					placeholder={`Поиск..(${column.getFacetedUniqueValues().size})`}
					list={column.id + '_list'}
				/>
				<div />
				<div className={classes.deleteIcon} onClick={() => column.setFilterValue('')}>
					<ClearIcon />
				</div>
			</VStack>
		);
};
