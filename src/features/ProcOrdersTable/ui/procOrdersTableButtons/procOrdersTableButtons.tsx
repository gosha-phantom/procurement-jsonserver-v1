import { memo, useCallback, useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-2.svg';
import { ReactComponent as EditIcon } from 'shared/assets/icons/edit-major.svg';
import { useAppDispatch } from 'shared/lib';
import { Button, ButtonThemeEnum, VStack } from 'shared/ui';
import { deleteProcOrdersByOrderID } from 'entities/ProcOrders/model/procOrders.services';
import { ProcOrder } from 'entities/ProcOrders/model/procOrders.types';

interface procOrdersTableButtonsProps {
    className?: string;
    disableEdit: boolean;
    disableDelete: boolean;
    cellProps: CellContext<ProcOrder, unknown>
}

export const ProcOrdersTableButtons = memo((props: procOrdersTableButtonsProps) => {
	const { disableDelete, disableEdit, cellProps } = props;
	const [visibleDeleteButton, setVisibleDeleteButton] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const originalData = cellProps.row.original;

	console.log('Render component');

	useEffect(() => {
		console.log('Render useEffect');
		if (originalData.statusID === 1) setVisibleDeleteButton(true);
	}, [originalData]);


	const onDeleteBtnClick = useCallback(() => {
		console.log(originalData);
		dispatch(deleteProcOrdersByOrderID(originalData.ID));
	}, [dispatch, originalData]);

	return (
		<VStack align={'center'} gap={'8'}>
			{!disableEdit && (
				<Button disabled={disableEdit} theme={ButtonThemeEnum.CLEAR}><EditIcon /></Button>
			)}
			{!disableDelete && visibleDeleteButton && (
				<Button
					disabled={disableDelete}
					theme={ButtonThemeEnum.CLEAR}
					onClick={onDeleteBtnClick}
				><DeleteIcon /></Button>
			)}
		</VStack>
	);
});
