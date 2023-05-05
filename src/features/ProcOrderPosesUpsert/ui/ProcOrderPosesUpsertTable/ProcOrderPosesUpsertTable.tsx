import {
	useProcOrderPosesUpsertActions,
	useSelectProcOrderPoses,
	useSelectProcOrderPosesEdit
} from 'entities/ProcOrderPosesUpsert';
import { memo } from 'react';
import AddIcon from 'shared/assets/icons/add-icon.svg';

import { classNames } from 'shared/lib';
import { Button, ButtonThemeEnum, HStack, Text, TextSizeEnum, VStack } from 'shared/ui';

import { ProcOrderPosesUpsertCard } from '../ProcOrderPosesUpsertCard/ProcOrderPosesUpsertCard';

import classes from './ProcOrderPosesUpsertTable.module.scss';

interface ProcOrderPosesCreateFormProps {
    className?: string;
}

export const ProcOrderPosesUpsertTable = memo((props: ProcOrderPosesCreateFormProps) => {
	const { className } = props;
	const procOrderPosesAll = useSelectProcOrderPoses();
	const editProcOrderPos = useSelectProcOrderPosesEdit();
	const { addProcOrderPos } = useProcOrderPosesUpsertActions();

	return (
		<HStack className={classNames(classes.ProcOrderPosesCreateForm, {}, [className])}>
			<Button onClick={() => addProcOrderPos()} theme={ButtonThemeEnum.CLEAR} disabled={!!editProcOrderPos}>
				<VStack gap={'8'} align={'center'} className={classes.add} maxWidth={false}>
					<AddIcon />
					<Text size={TextSizeEnum.MEDIUM}>Добавить товар в заявку</Text>
				</VStack>
			</Button>
			<HStack className={classes.cards}>
				{!procOrderPosesAll && (<Text size={TextSizeEnum.MEDIUM}>Нет товаров в заявке.</Text>)}
				{procOrderPosesAll && (procOrderPosesAll.map(item => (
					<ProcOrderPosesUpsertCard item={item} key={item.ID} disabled={item.ID !== editProcOrderPos}/>
				)))}
			</HStack>

		</HStack>
	);
});
