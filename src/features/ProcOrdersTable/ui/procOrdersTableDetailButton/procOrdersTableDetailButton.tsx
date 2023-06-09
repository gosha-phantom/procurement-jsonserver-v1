import { CellContext } from '@tanstack/react-table';
import { ProcOrder } from 'entities/ProcOrders';
import { memo } from 'react';
import DetailIcon from 'shared/assets/icons/detail.svg';
import { classNames } from 'shared/lib';
import { Button, ButtonThemeEnum } from 'shared/ui';

interface procOrdersTableDetailButtonProps {
    className?: string;
    cellProps?: CellContext<ProcOrder, unknown>;
}

export const ProcOrdersTableDetailButton = memo((props: procOrdersTableDetailButtonProps) => {
	const { className, cellProps } = props;

	return (
		<Button theme={ButtonThemeEnum.CLEAR} className={classNames('', {}, [className])}>
			<DetailIcon />
		</Button>

	);
});
