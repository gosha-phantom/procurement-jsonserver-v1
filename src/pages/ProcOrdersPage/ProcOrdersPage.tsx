import { ProcOrdersTable } from 'entities/ProcOrders';
import { memo, useState } from 'react';
import { classNames } from 'shared/lib';
import { SimpleInput, Text, TextSize, VStack } from 'shared/ui';
import classes from './ProcOrdersPage.module.scss';

interface ProcOrdersPageProps {
    className?: string;
}

const ProcOrdersPage = (props: ProcOrdersPageProps) => {
	const { className } = props;
	const [myOrders, setMyOrders] = useState<boolean>(false);

	return (
		<main className={classNames(classes.ProcOrdersPage, {}, [className])}>
			<VStack align={'center'} gap={'32'}>
				<Text size={TextSize.LARGE}>Таблица заказов на закупку</Text>
				<VStack gap={'8'} maxWidth={false} align={'center'}>
					<SimpleInput type="checkbox" checked={myOrders} onChange={(e) => {
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
