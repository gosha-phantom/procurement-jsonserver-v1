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
import classes from './Pagination.module.scss';

interface PaginationProps {
    className?: string;
    table: Table<any>;
}

export const Pagination = memo((props: PaginationProps) => {
	const { className, table } = props;

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
				options={[
					{ key: '10', value: '10' },
					{ key: '20', value: '20' },
					{ key: '30', value: '30' },
					{ key: '40', value: '40' },
					{ key: '50', value: '50' }
				]}
				label={'Показать строк:'}
			/>
		</VStack>
	);
});
