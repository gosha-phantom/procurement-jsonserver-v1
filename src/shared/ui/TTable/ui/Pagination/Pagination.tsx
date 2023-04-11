import { Table } from '@tanstack/react-table';
import { ChangeEvent, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	Button,
	ButtonThemeTypes,
	Select,
	SimpleInput,
	SimpleInputTextAlignTypes,
	SimpleInputThemeTypes, VStack
} from 'shared/ui';
import { SelectOption } from 'shared/ui/Select/Select';
import classes from './Pagination.module.scss';

interface PaginationProps {
    className?: string;
    table: Table<any>;
    selectPageSizes: number[];
}

export const Pagination = memo((props: PaginationProps) => {
	const { className, table, selectPageSizes } = props;

	return (
		<VStack gap={'8'} align={'center'} className={classNames('', {}, [className])}>
			<Button
				theme={ButtonThemeTypes.ROUNDED}
				onClick={() => table.setPageIndex(0)}
				disabled={!table.getCanPreviousPage()}
			>{'<<'}</Button>
			<Button
				theme={ButtonThemeTypes.ROUNDED}
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>{'<'}</Button>
			<Button
				theme={ButtonThemeTypes.ROUNDED}
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>{'>'}</Button>
			<Button
				theme={ButtonThemeTypes.ROUNDED}
				onClick={() => table.setPageIndex(table.getPageCount()-1)}
				disabled={!table.getCanNextPage()}
			>{'>>'}</Button>
            Страница <strong>{table.getState().pagination.pageIndex + 1}</strong> из <strong>{table.getPageCount()}</strong>
            | <span className={classes['w-20-rem']}>Перейти к странице</span>
			<SimpleInput
				className={classes['w-5-rem']}
				type="number"
				theme={SimpleInputThemeTypes.ROUNDED}
				textAlign={SimpleInputTextAlignTypes.CENTER}
				defaultValue={table.getState().pagination.pageIndex + 1}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					const page = e.target.value ? Number(e.target.value) - 1 : 0;
					// console.log(e);
					table.setPageIndex(page);
				}}
			/>
			<Select
				value={String(table.getState().pagination.pageSize)}
				onChange={(e: ChangeEvent<HTMLSelectElement>) => {
					table.setPageSize(Number(e.target.value));
				}}
				options={selectPageSizes.map((value: number) => {
					return { key: value.toString(), value: value.toString() } as SelectOption;
				})}
				label={'Показать строк:'}
			/>
		</VStack>
	);
});
