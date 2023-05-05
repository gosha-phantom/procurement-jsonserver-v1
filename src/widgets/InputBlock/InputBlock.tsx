import {
	DebouncedInput,
	SimpleInputElements,
	SimpleInputThemeEnum,
	Text,
	VStack,
} from 'shared/ui';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './InputBlock.module.scss';

export const enum InputBlockWidthEnum {
    WIDTH_12 = 'width-12',
    WIDTH_10 = 'width-10',
    WIDTH_08 = 'width-08',
    WIDTH_06 = 'width-06',
    WIDTH_04 = 'width-04',
}

interface InputBlockProps {
    label?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    delay?: number;
    type?: string;
    min?: string;
    max?: string;
    as?: SimpleInputElements;
    rows?: number;
    labelWidth?: InputBlockWidthEnum;
    inputWidth?: InputBlockWidthEnum;
    isExpansive?: boolean
}

export const InputBlock = (props: InputBlockProps) => {
	const {
		label, disabled, min, max, onChange, rows,
		value = '',
		delay = 500,
		inputWidth,
		type = 'text',
		as = 'input',
		labelWidth = InputBlockWidthEnum.WIDTH_12,
		isExpansive = false
	} = props;

	return (
		<VStack gap={'8'} maxWidth>
			<Text className={classNames(classes.text, { [classes[labelWidth]]: true }, [])}>{label}:</Text>
			<DebouncedInput
				className={classNames(classes.input, { [classes.expansive]: isExpansive }, [])}
				value={value}
				theme={SimpleInputThemeEnum.ROUNDED}
				disabled={disabled}

				// TODO
				// @ts-ignore
				onChange={onChange}
				delay={delay}
				width={inputWidth}
				type={type}
				min={min}
				max={max}
				as={as}
				rows={rows}
			/>
		</VStack>
	);
};
