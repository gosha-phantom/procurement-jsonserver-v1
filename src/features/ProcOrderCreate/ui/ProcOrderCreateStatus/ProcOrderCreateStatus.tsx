import { useProcOrderCreateActions } from 'features/ProcOrderCreate/model/procOrderCreate.slice';
import { useEffect, useRef } from 'react';
import { HStack, Loader, LoaderSize, Text, TextSizeEnum, VStack } from 'shared/ui';
import {
	useSelectProcOrderCreateError,
	useSelectProcOrderCreateID,
	useSelectProcOrderCreateIsLoading
} from '../../model/procOrderCreate.selectors';
import { classNames } from 'shared/lib';
import classes from './ProcOrderCreateStatus.module.scss';

interface procOrderCreateStatusProps {
    className?: string;
}

export const ProcOrderCreateStatus = (props: procOrderCreateStatusProps) => {
	const { className } = props;

	const isLoading = useSelectProcOrderCreateIsLoading();
	const error = useSelectProcOrderCreateError();
	const createdOrderID = useSelectProcOrderCreateID();
	// const createdOrderID_ref = useRef<number | null>(null);

	// useEffect(() => {
	// 	if (createdOrderID) {
	// 		createdOrderID_ref.current = createdOrderID.ID;
	// 	}
	// }, [createdOrderID]);
	// const { clearCreatedOrderID } = useProcOrderCreateActions();

	// useEffect(() => {
	// 	let timeout: NodeJS.Timeout;
	// 	if (createdOrderID) {
	// 		timeout = setTimeout(() => {
	// 			console.log(createdOrderID);
	// 			clearCreatedOrderID();
	// 		}, 5000);
	// 	}
	//
	// 	// clear timeout interval
	// 	return () => clearTimeout(timeout);
	// }, [createdOrderID, clearCreatedOrderID]);

	let content;

	switch (isLoading) {
	case true:
		content = (
			<VStack gap={'16'}>
				<Loader size={LoaderSize.MEDIUM} />
				<Text size={TextSizeEnum.MEDIUM}>Сохранение заявки в базу данных</Text>
			</VStack>);
		break;
	case false:
		switch (!!error) {
		case true:
			content = (<Text color={'red'} size={TextSizeEnum.MEDIUM}>{error}</Text>);
			break;
		case false:
			if (createdOrderID) {
				content = (
					<Text
						className={classes.element}
						color={'green'}
						size={TextSizeEnum.MEDIUM}
					>Заявка успешно создана.</Text>);
				break;
			}
			content = null;
		}
	}

	return (
		<HStack className={classNames(classes.ProcOrderCreateStatus, {}, [className])}>
			{content}
		</HStack>
	);
};
