import { selectProcAuthData } from 'entities/ProcAuthLogin';
import {
	getProcOrders,
	getProcOrdersByUserID,
	procOrdersReducer,
	selectProcOrdersAll,
	selectProcOrdersError,
	selectProcOrdersIsLoading,
} from 'entities/ProcOrders';
import { ProcOrdersTable } from 'features/ProcOrdersTable';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames, DynamicModuleLoader, ReducersList, useAppDispatch } from 'shared/lib';
import { Button, ButtonThemeEnum, SimpleInput, Text, TextSizeEnum, VStack } from 'shared/ui';
import classes from './ProcOrdersPage.module.scss';

interface ProcOrdersPageProps {
    className?: string;
}

const reducers: ReducersList = {
	procOrders: procOrdersReducer,
};

const ProcOrdersPage = (props: ProcOrdersPageProps) => {
	const { className } = props;

	const [myOrders, setMyOrders] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const isLoading = useSelector(selectProcOrdersIsLoading);
	const error = useSelector(selectProcOrdersError);
	const data = useSelector(selectProcOrdersAll);
	const authData = useSelector(selectProcAuthData);
	const checkMyOrderDisabled = isLoading || !authData;

	useEffect(() => {
		if (!authData) { setMyOrders(false);}
	}, [authData]);

	const onRefreshBtnClick = useCallback(() => {
		!myOrders && dispatch(getProcOrders());
		myOrders && dispatch(getProcOrdersByUserID(authData?.ID));
	}, [dispatch, authData?.ID, myOrders]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<main className={classNames(classes.ProcOrdersPage, {}, [className])}>
				<VStack as={'section'} align={'center'} gap={'32'}>
					<Text size={TextSizeEnum.LARGE}>Таблица заказов на закупку</Text>
					<VStack gap={'8'} maxWidth={false} align={'center'}>
						<SimpleInput
							type="checkbox"
							checked={myOrders}
							disabled={checkMyOrderDisabled}
							onChange={(e) => {
								setMyOrders(Boolean(e.target.checked));
							}}
						/>
						<Text disabled={checkMyOrderDisabled} size={TextSizeEnum.MEDIUM}>Показать мои заявки</Text>
						<Button
							disabled={checkMyOrderDisabled}
							theme={ButtonThemeEnum.ROUNDED}
							className={classes.buttonRefresh}
							onClick={onRefreshBtnClick}
						>Обновить данные</Button>
					</VStack>
				</VStack>
				{error && <Text color={'red'} size={TextSizeEnum.MEDIUM}>{error}</Text>}
				{!error && (
					<ProcOrdersTable
						myOrders={myOrders}
						disableEdit={!myOrders}
						disableDelete={!myOrders}
						data={data}
						authData={authData}
					/>
				)}
			</main>
		</DynamicModuleLoader>
	);
};

export default memo(ProcOrdersPage);
