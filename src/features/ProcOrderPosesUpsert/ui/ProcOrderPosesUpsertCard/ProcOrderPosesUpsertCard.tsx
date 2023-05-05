import { memo, useState } from 'react';
import { classNames } from 'shared/lib';
import { Button, ButtonThemeEnum, HStack, VStack } from 'shared/ui';
import { ProcOrderPosesUpsert } from 'entities/ProcOrderPosesUpsert';
import { useProcOrderPosesUpsertActions } from 'entities/ProcOrderPosesUpsert';
import { InputBlock, InputBlockWidthEnum } from 'widgets/InputBlock/InputBlock';
import { MeasureSelectBlock } from '../components/MesureSelectBlock';
import classes from './ProcOrderPosesUpsertCard.module.scss';

interface ProcOrderPosCardProps {
    className?: string;
    item: ProcOrderPosesUpsert;
    disabled: boolean
}

export const ProcOrderPosesUpsertCard = memo((props: ProcOrderPosCardProps) => {
	const { className, item, disabled } = props;
	const {
		ID, link: initialLink, quantity: initialQuantity, article: initialArticle, title: initialTitle,
		parameter: initialParameter, measureID: initialMeasureID, costCenter: initialCostCenter
	} = item;
	const {
		editProcOrderPos, deleteProcOrderPos, saveProcOrderPos,
	} = useProcOrderPosesUpsertActions();

	const [ link, setLink ] = useState<string | undefined>(initialLink);
	const [ quantity, setQuantity ] = useState<string>(initialQuantity.toString()) || '1';
	const [ article, setArticle ] = useState<string | undefined>(initialArticle);
	const [ title, setTitle ] = useState<string | undefined>(initialTitle);
	const [ parameter, setParameter ] = useState<string | undefined>(initialParameter);
	const [ measureID, setMeasureID ] = useState<string>(initialMeasureID.toString()) || '1';
	const [ costCenter, setCostCenter ] = useState<string | undefined>(initialCostCenter);

	const onSaveBtnClick = () => {
		const editedData: ProcOrderPosesUpsert = {
			ID, link, title, article, parameter, costCenter,
			quantity: Number(quantity),
			measureID: Number(measureID)
		};
		console.log(editedData);
		saveProcOrderPos(editedData);
	};

	return (
		<VStack gap={'16'} className={classNames(classes.ProcOrderPosCard, {}, [className])}>
			<HStack>
				<InputBlock
					label={'Название товара'}
					labelWidth={InputBlockWidthEnum.WIDTH_12}
					value={title}
					inputWidth={InputBlockWidthEnum.WIDTH_12}
					isExpansive
					onChange={setTitle}
					disabled={disabled}
				/>
				<InputBlock
					label={'Характеристика товара'}
					labelWidth={InputBlockWidthEnum.WIDTH_12}
					value={parameter}
					inputWidth={InputBlockWidthEnum.WIDTH_12}
					isExpansive
					onChange={setParameter}
					disabled={disabled}
				/>
				<InputBlock
					label={'Артикул товара'}
					labelWidth={InputBlockWidthEnum.WIDTH_12}
					value={article}
					inputWidth={InputBlockWidthEnum.WIDTH_12}
					isExpansive
					onChange={setArticle}
					disabled={disabled}
				/>
				<InputBlock
					label={'Ссылка'}
					labelWidth={InputBlockWidthEnum.WIDTH_12}
					value={link}
					inputWidth={InputBlockWidthEnum.WIDTH_12}
					isExpansive
					onChange={setLink}
					disabled={disabled}
				/>
			</HStack>
			<HStack maxWidth={false}>
				<InputBlock
					type={'number'}
					label={'Количество'}
					labelWidth={InputBlockWidthEnum.WIDTH_12}
					value={quantity}
					inputWidth={InputBlockWidthEnum.WIDTH_04}
					onChange={setQuantity}
					disabled={disabled}
				/>
				<MeasureSelectBlock value={measureID} onChange={setMeasureID} disabled={disabled}/>
				<InputBlock
					label={'Статья затрат'}
					labelWidth={InputBlockWidthEnum.WIDTH_12}
					value={costCenter}
					inputWidth={InputBlockWidthEnum.WIDTH_04}
					onChange={setCostCenter}
					disabled={disabled}
				/>
			</HStack>
			<HStack className={classes.buttons}>
				<Button
					theme={ButtonThemeEnum.ROUNDED}
					maxWidth
					disabled={!disabled}
					onClick={() => editProcOrderPos(item.ID)}
				>Редактировать</Button>
				<Button
					theme={ButtonThemeEnum.ROUNDED}
					maxWidth
					disabled={disabled || (title?.length === 0 && quantity?.length !== 0)}
					onClick={onSaveBtnClick}
				>Сохранить</Button>
				<Button
					theme={ButtonThemeEnum.ROUNDED}
					maxWidth
					onClick={() => deleteProcOrderPos(item.ID)}
				>Удалить</Button>
			</HStack>
		</VStack>
	);
});
