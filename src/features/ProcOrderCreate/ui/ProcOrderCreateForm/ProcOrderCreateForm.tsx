import { BuyTillInputBlock } from 'features/ProcOrderCreate/ui/components/BuyTillInputBlock';
import { OrderCreatedInputBlock } from 'features/ProcOrderCreate/ui/components/OrderCreatedInputBlock';
import { memo } from 'react';
import { warehousesReducer } from 'entities/Warehouse';
import { DynamicModuleLoader } from 'shared/lib';
import { classNames, ReducersList } from 'shared/lib';
import { HStack, Input, InputThemeTypes, Text, VStack } from 'shared/ui';
import { UserInputBlock } from '../components/UserInputBlock';
import { TitleInputBlock } from '../components/TitleInputBlock';
import { ProjectInputBlock } from '../components/ProjectInputBlock';
import classes from './ProcOrderCreateForm.module.scss';

const reducers: ReducersList = {
	// procOrderCreate: procOrderCreateReducer,
	warehouses: warehousesReducer,
};

interface ProcOrderCreateFormProps {
    className?: string;
}

export const ProcOrderCreateForm = memo((props: ProcOrderCreateFormProps) => {
	const { className } = props;

	return (
		<DynamicModuleLoader reducers={reducers}>
			<HStack maxWidth gap={'8'} className={classNames(classes.ProcOrderCreateForm, {}, [className])}>
				<HStack className={classes.inputBlock}>
					<UserInputBlock />
					<TitleInputBlock />
					<ProjectInputBlock />
					<OrderCreatedInputBlock />
					<BuyTillInputBlock />
					<VStack>
						<Text className={classes.text}>Статус заявки:</Text>
						<Input theme={InputThemeTypes.ROUNDED} />
					</VStack>
					<VStack>
						<Text className={classes.text}>Склад (куда везти):</Text>
						<Input theme={InputThemeTypes.ROUNDED} />
					</VStack>
					<VStack>
						<Text className={classes.text}>Обоснование закупки:</Text>
						<Input theme={InputThemeTypes.ROUNDED} />
					</VStack>
				</HStack>
			</HStack>
		</DynamicModuleLoader>

	);
});
