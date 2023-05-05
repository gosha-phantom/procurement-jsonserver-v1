import { measuresReducer } from 'entities/Measure';
import { procOrderCreateReducer } from 'features/ProcOrderCreate/model/procOrderCreate.slice';
import { FormEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ProcOrderPosesUpsertTable } from 'features/ProcOrderPosesUpsert';
import { useSelectProcAuthData } from 'entities/ProcAuthLogin';
import { procOrderPosesUpsertReducer } from 'entities/ProcOrderPosesUpsert';
import {
	useSelectProcOrderPoses, postProcOrderPosesCreate, useProcOrderPosesUpsertActions,
	useSelectProcOrderPosesCanClearState, useSelectProcOrderPosesEdit,
} from 'entities/ProcOrderPosesUpsert';
import { InputBlock } from 'widgets/InputBlock/InputBlock';
import { addDaysToDate, classNames, formatDate, useAppDispatch, ReducersList, DynamicModuleLoader } from 'shared/lib';
import { Button, ButtonThemeEnum, HStack, VStack } from 'shared/ui';

import { StatusSelectBlock } from '../components/StatusSelectBlock';
import { UserInputBlock } from '../components/UserInputBlock';
import { WarehouseSelectBlock } from '../components/WarehouseSelectBlock';
import { ProcOrderCreateStatus } from '../ProcOrderCreateStatus/ProcOrderCreateStatus';
import { postProcOrderCreate } from '../../model/procOrderCreate.services';
import { useSelectProcOrderCreateIsLoading, useSelectProcOrderCreateID } from '../../model/procOrderCreate.selectors';
import { useProcOrderCreateActions } from '../../model/procOrderCreate.slice';

import classes from './ProcOrderCreateForm.module.scss';


const reducers: ReducersList = {
	procOrderCreate: procOrderCreateReducer,
	procOrderPosesUpsert: procOrderPosesUpsertReducer,
	measures: measuresReducer,
};

interface ProcOrderCreateFormProps {
    className?: string;
}

export const ProcOrderCreateForm = memo((props: ProcOrderCreateFormProps) => {
	const { className } = props;
	const formatType = useRef<string>('yyyy-MM-dd');

	const dispatch = useAppDispatch();
	const isLoading = useSelectProcOrderCreateIsLoading();
	const procOrderPoses = useSelectProcOrderPoses();
	const procOrderCreateID = useSelectProcOrderCreateID();
	const { clearCreatedOrderID } = useProcOrderCreateActions();
	const { clearProcOrderPoses } = useProcOrderPosesUpsertActions();
	const canClearState = useSelectProcOrderPosesCanClearState();
	const editProcOrderPoses = useSelectProcOrderPosesEdit();

	const user = useSelectProcAuthData();
	const [title, setTitle] = useState<string>('');
	const [project, setProject] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const orderDateCreated = useRef<string>(formatDate(new Date(), { formatType: 'dd.MM.yyyy' }));

	const defaultDateBuyTill = useRef<string>(formatDate(addDaysToDate(
		new Date(), 5),
	{ formatType: formatType.current }));
	const dateBuyTill = useRef<string>('');
	const minDate = useRef<string>(formatDate(addDaysToDate(
		new Date(), 1),
	{ formatType: formatType.current }));
	const maxDate = useRef<string>(formatDate(addDaysToDate(
		new Date(), 45),
	{ formatType: formatType.current }));
	const onChangeDateBuyTill = useCallback((e: string | number) => {
		dateBuyTill.current = e as string;
	}, []);

	const [status, setStatus] = useState<string>('1');
	const [warehouse, setWarehouse] = useState<string>('1');

	const onSubmitHandler = (e: FormEvent) => { e.preventDefault(); };

	const isBtnSubmitEnable = useMemo<boolean>(() => {
		console.log(editProcOrderPoses);
		if (!editProcOrderPoses) {
			return title.length !== 0;
		}
		return false;
	}, [title, editProcOrderPoses]);

	const onClearOrderData = useCallback(() => {
		setTitle('');
		setProject('');
		setDescription('');
		dateBuyTill.current = defaultDateBuyTill.current;
	}, []);

	const onSubmitOrderData = useCallback(() => {
		dispatch(postProcOrderCreate({
			title, description, project,
			userID: user?.ID,
			statusID: Number(status),
			warehouseID: Number(warehouse),
			dateCreated: orderDateCreated.current,
			dateBuyTill: dateBuyTill.current,
		}));
	}, [dispatch, title, project, description, status, warehouse, user?.ID]);

	useEffect(() => {
		if (procOrderCreateID) {
			dispatch(postProcOrderPosesCreate({
				orderID: procOrderCreateID!.ID,
				procOrderPoses: procOrderPoses!,
			}));
		}
	}, [dispatch, procOrderPoses, procOrderCreateID]);

	useEffect(() => {
		if(canClearState) {
			clearProcOrderPoses();
			clearCreatedOrderID();
			onClearOrderData();
		}
	}, [canClearState, clearCreatedOrderID, clearProcOrderPoses, onClearOrderData]);


	useEffect(() => {
		dateBuyTill.current = defaultDateBuyTill.current;
	}, [defaultDateBuyTill]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<ProcOrderCreateStatus />
			<HStack maxWidth maxHeight gap={'16'} className={classNames(classes.ProcOrderCreateForm, {}, [className])}>
				<VStack as={'form'} gap={'16'} className={classes.order} onSubmit={onSubmitHandler} >
					<HStack className={classes.inputBlock} maxWidth>
						<UserInputBlock/>
						<InputBlock label={'Описание'} value={title} onChange={setTitle} disabled={isLoading} />
						<InputBlock label={'Проект'} value={project} onChange={setProject} disabled={isLoading} />
						<InputBlock label={'Заявка создана'} value={orderDateCreated.current} disabled={true} />
						<InputBlock
							label={'Закупить до'}
							value={dateBuyTill.current}
							onChange={onChangeDateBuyTill}
							type={'date'}
							min={minDate.current}
							max={maxDate.current}
							disabled={isLoading}
						/>
						<StatusSelectBlock value={status} onChange={setStatus} />
						<WarehouseSelectBlock value={warehouse} onChange={setWarehouse} />
						<InputBlock
							label={'Обоснование закупки'}
							value={description}
							onChange={setDescription}
							as={'textarea'}
							rows={2}
							disabled={isLoading}
						/>
					</HStack>
					<HStack className={classes.buttons} gap={'8'} maxWidth>
						<Button
							className={classes.button}
							theme={ButtonThemeEnum.ROUNDED}
							disabled={!isBtnSubmitEnable}
							onClick={onSubmitOrderData}
						>Создать заявку</Button>
						<Button
							className={classes.button}
							theme={ButtonThemeEnum.ROUNDED}
							onClick={onClearOrderData}
						>Отклонить заявку</Button>
					</HStack>
				</VStack>
				<ProcOrderPosesUpsertTable className={classes['order-poses']}/>
			</HStack>
		</DynamicModuleLoader>
	);
});
