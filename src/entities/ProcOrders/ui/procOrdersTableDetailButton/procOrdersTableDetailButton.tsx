import { CellContext } from '@tanstack/react-table';
import { ProcOrder } from 'entities/ProcOrders';
import { memo } from 'react';
import { ReactComponent as DetailIcon } from 'shared/assets/icons/detail.svg';
import { classNames } from 'shared/lib';
import { Button, ButtonThemeTypes } from 'shared/ui';

interface procOrdersTableDetailButtonProps {
    className?: string;
    cellProps?: CellContext<ProcOrder, unknown>;
}

export const ProcOrdersTableDetailButton = memo((props: procOrdersTableDetailButtonProps) => {
	const { className, cellProps } = props;

	return (
		<Button theme={ButtonThemeTypes.CLEAR}>
			<DetailIcon
				className={classNames('', {}, [className])}
			/>
		</Button>

	);
});
