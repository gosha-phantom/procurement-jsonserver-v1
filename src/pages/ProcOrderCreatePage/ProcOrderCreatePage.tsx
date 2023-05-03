import { memo } from 'react';
import { classNames } from 'shared/lib';
import { HStack, Text, TextSize } from 'shared/ui';
import { ProcOrderCreateForm } from 'features/ProcOrderCreate';
import classes from './ProcOrderCreatePage.module.scss';

interface ProcOrderCreatePageProps {
    className?: string;
}

const ProcOrderCreatePage = memo((props: ProcOrderCreatePageProps) => {
	const { className } = props;

	return (
		<HStack
			className={classNames(classes.ProcOrderCreatePage, {}, [className])}
			as={'section'}
			gap={'16'}
		>
			<Text size={TextSize.LARGE}>Новая заявка на закупку</Text>
			<ProcOrderCreateForm className={classes.content} />
		</HStack>
	);
});

export default ProcOrderCreatePage;
