import { memo } from 'react';

import { classNames } from 'shared/lib';
import { HStack, TextSizeEnum, VStack, Text } from 'shared/ui';
import AddIcon from 'shared/assets/icons/add-icon.svg';

import { ProcOrderPosesCard } from '../ProcOrderPosesCard/ProcOrderPosesCard';

import classes from './ProcOrderPosesCreateForm.module.scss';

interface ProcOrderPosesCreateFormProps {
    className?: string;
}

export const ProcOrderPosesCreateForm = memo((props: ProcOrderPosesCreateFormProps) => {
	const { className } = props;


	return (
		<HStack className={classNames(classes.ProcOrderPosesCreateForm, {}, [className])}>
			<VStack gap={'16'} align={'center'} className={classes.add}>
				<AddIcon />
				<Text size={TextSizeEnum.MEDIUM}>Добавить товар в заявку</Text>
			</VStack>
			<HStack className={classes.cards}>

				<ProcOrderPosesCard />
				<ProcOrderPosesCard />
				<ProcOrderPosesCard />
				<ProcOrderPosesCard />
				<ProcOrderPosesCard />
				<ProcOrderPosesCard />
				<ProcOrderPosesCard />
				<ProcOrderPosesCard />
				<ProcOrderPosesCard />
			</HStack>

		</HStack>
	);
});
