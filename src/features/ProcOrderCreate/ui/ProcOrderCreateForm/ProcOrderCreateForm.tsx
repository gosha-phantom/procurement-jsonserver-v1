import { FormEvent, memo, MutableRefObject, Ref, RefObject, useRef } from 'react';

import { BuyTillInputBlock } from 'features/ProcOrderCreate/ui/components/BuyTillInputBlock';
import { OrderCreatedInputBlock } from 'features/ProcOrderCreate/ui/components/OrderCreatedInputBlock';
import { useSelectProcAuthData } from 'entities/ProcAuthLogin';
import { classNames } from 'shared/lib';
import { Button, ButtonThemeEnum, HStack, VStack } from 'shared/ui';

import { DescriptionInputBlock } from '../components/DescriptionInputBlock';
import { ProjectInputBlock } from '../components/ProjectInputBlock';
import { StatusSelectBlock } from '../components/StatusSelectBlock';
import { TitleInputBlock } from '../components/TitleInputBlock';
import { UserInputBlock } from '../components/UserInputBlock';
import { WarehouseSelectBlock } from '../components/WarehouseSelectBlock';

import classes from './ProcOrderCreateForm.module.scss';


interface ProcOrderCreateFormProps {
    className?: string;
}

export const ProcOrderCreateForm = memo((props: ProcOrderCreateFormProps) => {
	const { className } = props;

	// const user = useSelectProcAuthData();
	const titleRef = useRef<string | number>(null);
	// const projectRef = useRef<string | null>(null);
	// const dateCreatedRef = useRef<string | null>(null);
	// const buyTillRef = useRef<string | null>(null);
	// const statusRef = useRef<string | null>(null);
	// const warehouseRef = useRef<string | null>(null);
	// const descriptionRef = useRef<string | null>(null);

	const onSubmitHandler = (e: FormEvent) => { e.preventDefault(); };

	// console.log((titleRef.current));

	return (
		<HStack maxWidth gap={'16'} className={classNames(classes.ProcOrderCreateForm, {}, [className])}>
			<VStack as={'form'} gap={'16'} className={classes.order} onSubmit={onSubmitHandler}>
				<HStack className={classes.inputBlock} maxWidth>
					<UserInputBlock/>
					<TitleInputBlock ref={titleRef}/>
					<ProjectInputBlock />
					<OrderCreatedInputBlock />
					<BuyTillInputBlock />
					<StatusSelectBlock />
					<WarehouseSelectBlock />
					<DescriptionInputBlock />
				</HStack>
				<HStack className={classes.buttons} gap={'8'} maxWidth>
					<Button type={'submit'} className={classes.button} theme={ButtonThemeEnum.ROUNDED}>Создать заявку</Button>
					<Button className={classes.button} theme={ButtonThemeEnum.ROUNDED}>Отклонить заявку</Button>
				</HStack>
			</VStack>
		</HStack>
	);
});
