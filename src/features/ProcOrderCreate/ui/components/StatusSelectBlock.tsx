import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	getProcOrderStatus,
	procOrderStatusReducer,
	selectProcOrderStatusAll,
	useSelectProcOrderStatusError,
	useSelectProcOrderStatusIsLoading
} from 'entities/ProcOrderStatus';
import { DynamicModuleLoader, ReducersList, useAppDispatch } from 'shared/lib';
import { SelectOptionType, SelectWidthEnum } from 'shared/ui';
import { SelectBlock } from './SelectBlock/SelectBlock';

const reducers: ReducersList = {
	procOrderStatus: procOrderStatusReducer
};

export const StatusSelectBlock = () => {
	const [value, setValue] = useState<string>('');
	const dispatch = useAppDispatch();
	const statusList = useSelector(selectProcOrderStatusAll);
	const isLoading = useSelectProcOrderStatusIsLoading();
	const error = useSelectProcOrderStatusError();

	const options = useMemo<SelectOptionType[]>(() => {
		if (statusList) {
			return statusList.map(item => {
				return { key: item.ID.toString(), value: item.title };
			});
		}
		return [];
	}, [statusList]);

	useEffect(() => {
		dispatch(getProcOrderStatus());
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<SelectBlock
				label={'Статус заявки'}
				value={value}
				onChange={(e) => setValue(e)}
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
