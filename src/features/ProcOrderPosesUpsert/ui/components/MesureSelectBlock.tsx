import { useEffect, useMemo } from 'react';
import {
	measuresReducer, useSelectMeasuresAll, useSelectMeasuresError, useSelectMeasuresIsLoading, getMeasures,
} from 'entities/Measure';
import { DynamicModuleLoader, ReducersList, useAppDispatch } from 'shared/lib';
import { SelectOptionType } from 'shared/ui';
import { SelectBlock } from 'widgets/SelectBlock/SelectBlock';

// const reducers: ReducersList = {
// 	measures: measuresReducer
// };

interface MeasureSelectBlockProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean
}

export const MeasureSelectBlock = (props: MeasureSelectBlockProps) => {
	const { value, onChange, disabled = false } = props;

	const dispatch = useAppDispatch();
	const measureList = useSelectMeasuresAll();
	const isLoading = useSelectMeasuresIsLoading();
	const error = useSelectMeasuresError();

	const options = useMemo<SelectOptionType[]>(() => {
		if (measureList) {
			return measureList.map(item => {
				return { key: item.ID.toString(), value: item.title };
			});
		}
		return [];
	}, [measureList]);

	useEffect(() => {
		dispatch(getMeasures());
	}, [dispatch]);

	return (
		// <DynamicModuleLoader reducers={reducers}>
		<SelectBlock
			label={'Единица измерения'}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			isLoading={isLoading}
			isError={!!error}
			error={error}
			options={options}
			disabled={disabled}
		/>
		// </DynamicModuleLoader>
	);
};
