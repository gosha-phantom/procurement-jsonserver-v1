import { ProcOrdersTable } from 'entities/ProcOrders';
import { memo, useState } from 'react';
import { classNames } from 'shared/lib';
import { SimpleInput, Text, TextSize, VStack } from 'shared/ui';
import { selectProcOrdersIsLoading } from 'entities/ProcOrders';
import classes from './ProcOrdersPage.module.scss';
import { useSelector } from 'react-redux';

interface ProcOrdersPageProps {
    className?: string;
}

const ProcOrdersPage = (props: ProcOrdersPageProps) => {
	const { className } = props;
	const [myOrders, setMyOrders] = useState<boolean>(false);
	const isLoading = useSelector(selectProcOrdersIsLoading);

	return (
		<main className={classNames(classes.ProcOrdersPage, {}, [className])}>
			<VStack as={'section'} align={'center'} gap={'32'}>
				<Text size={TextSize.LARGE}>Таблица заказов на закупку</Text>
				<VStack gap={'8'} maxWidth={false} align={'center'}>
					<SimpleInput type="checkbox" checked={myOrders} disabled={isLoading} onChange={(e) => {
						setMyOrders(Boolean(e.target.checked));
					}}/>
					<Text size={TextSize.MEDIUM}>Показать мои заявки</Text>
				</VStack>
			</VStack>
			<ProcOrdersTable myOrders={myOrders}/>
		</main>
	);
};

export default memo(ProcOrdersPage);
