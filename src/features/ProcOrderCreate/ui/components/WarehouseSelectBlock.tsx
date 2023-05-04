import {
	getWarehouses,
	useSelectWarehousesAll,
	useSelectWarehousesError,
	useSelectWarehousesIsLoading,
	warehousesReducer
} from 'entities/Warehouse';
import { useEffect, useMemo, useState } from 'react';
import { DynamicModuleLoader, ReducersList, useAppDispatch } from 'shared/lib';
import { SelectOptionType, SelectWidthEnum } from 'shared/ui';
import { SelectBlock } from './SelectBlock/SelectBlock';

const reducers: ReducersList = {
	warehouses: warehousesReducer
};

interface WarehouseSelectBlockProps {
    value: string;
    onChange: (value: string) => void;
}

export const WarehouseSelectBlock = (props: WarehouseSelectBlockProps) => {
	const { value, onChange } = props;

	const dispatch = useAppDispatch();
	const warehouses = useSelectWarehousesAll();
	const isLoading = useSelectWarehousesIsLoading();
	const error = useSelectWarehousesError();

	const options = useMemo<SelectOptionType[]>(() => {
		if (warehouses) {
			return warehouses.map(item => {
				return { key: item.ID.toString(), value: item.title };
			});
		}
		return [];
	}, [warehouses]);

	useEffect(() => {
		dispatch(getWarehouses());
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<SelectBlock
				label={'Склад (куда привезти)'}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				isLoading={isLoading}
				isError={!!error}
				error={error}
				options={options}
				width={SelectWidthEnum.QUARTER_WIDTH}
				disabled={true}
			/>
		</DynamicModuleLoader>
	);
};
