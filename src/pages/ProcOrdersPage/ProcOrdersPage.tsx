import { selectProcAuthData } from 'entities/ProcAuthLogin';
import {
	getProcOrders,
	getProcOrdersByUserID,
	ProcOrdersTable,
	selectProcOrdersError,
	selectProcOrdersIsLoading
} from 'entities/ProcOrders';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames, useAppDispatch } from 'shared/lib';
import { Button, ButtonThemeTypes, SimpleInput, Text, TextSize, VStack } from 'shared/ui';
import classes from './ProcOrdersPage.module.scss';

interface ProcOrdersPageProps {
    className?: string;
}

const ProcOrdersPage = (props: ProcOrdersPageProps) => {
	const { className } = props;
	const [myOrders, setMyOrders] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const isLoading = useSelector(selectProcOrdersIsLoading);
	const error = useSelector(selectProcOrdersError);
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
		<main className={classNames(classes.ProcOrdersPage, {}, [className])}>
			<VStack as={'section'} align={'center'} gap={'32'}>
				<Text size={TextSize.LARGE}>Таблица заказов на закупку</Text>
				<VStack gap={'8'} maxWidth={false} align={'center'}>
					<SimpleInput
						type="checkbox"
						checked={myOrders}
						disabled={checkMyOrderDisabled}
						onChange={(e) => {
							setMyOrders(Boolean(e.target.checked));
						}}
					/>
					<Text disabled={checkMyOrderDisabled} size={TextSize.MEDIUM}>Показать мои заявки</Text>
					<Button
						disabled={checkMyOrderDisabled}
						theme={ButtonThemeTypes.ROUNDED}
						className={classes.buttonRefresh}
						onClick={onRefreshBtnClick}
					>Обновить данные</Button>
				</VStack>
			</VStack>
			{error && <Text color={'red'} size={TextSize.MEDIUM}>{error}</Text>}
			<ProcOrdersTable
				myOrders={myOrders}
				disableEdit={!myOrders}
				disableDelete={!myOrders}
			/>
		</main>
	);
};

export default memo(ProcOrdersPage);
