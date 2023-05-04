import { memo, useId } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib';
import { VStack } from 'shared/ui';
import { selectProcOrderPosesByID } from '../../model/procOrderCreate.selectors';
import classes from './ProcOrderPosesCard.module.scss';

interface ProcOrderPosCardProps {
    className?: string;
    ID: string;
}

export const ProcOrderPosesCard = memo((props: ProcOrderPosCardProps) => {
	const { className, ID } = props;
	// const ID = useId();
	const orderPosByID = useSelector(selectProcOrderPosesByID(ID));

	return (
		<VStack justify={'between'} className={classNames(classes.ProcOrderPosCard, {}, [className])}>
            ProcOrderPosCard
		</VStack>
	);
});
