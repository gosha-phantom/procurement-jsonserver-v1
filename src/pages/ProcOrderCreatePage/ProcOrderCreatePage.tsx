import { memo } from 'react';
import { classNames, DynamicModuleLoader, ReducersList } from 'shared/lib';
import { HStack } from 'shared/ui';
import classes from './ProcOrderCreatePage.module.scss';
import { procOrderCreateReducer } from 'entities/ProcOrderCreate';
import { warehousesReducer } from 'entities/Warehouse';
import { useSelector } from 'react-redux';
import { selectWarehouses } from 'entities/Warehouse/model/warehouse.slice';

interface ProcOrderCreatePageProps {
    className?: string;
}

const reducers: ReducersList = {
	// procOrderCreate: procOrderCreateReducer,
	warehouses: warehousesReducer,
};

const ProcOrderCreatePage = memo((props: ProcOrderCreatePageProps) => {
	const {
		className,
	} = props;
	const warehouses = useSelector(selectWarehouses.selectAll);
	console.log(warehouses);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<HStack
				className={classNames(classes.ProcOrderCreatePage, {}, [className])}
				as={'section'}
				gap={'16'}
			>
				ProcOrderCreatePage
			</HStack>
		</DynamicModuleLoader>
	);
});

export default ProcOrderCreatePage;
