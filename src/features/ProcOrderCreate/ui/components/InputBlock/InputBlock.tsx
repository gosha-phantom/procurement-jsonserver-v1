import { DebouncedInput, InputWidthTypes, SimpleInputThemeTypes, SimpleInputWidthTypes, Text, VStack, } from 'shared/ui';
import classes from './InputBlock.module.scss';

interface InputBlockProps {
    label?: string;
    disabled?: boolean;
    inputValue?: string | number;
    onChange?: (value: string | number) => void;
    delay?: number;
    inputWidth?: SimpleInputWidthTypes;
    type?: string;
    min?: string;
    max?: string;
}

export const InputBlock = (props: InputBlockProps) => {
	const {
		label,
		disabled,
		inputValue = '',
		onChange,
		delay = 0,
		inputWidth,
		type = 'text',
		min,
		max
	} = props;

	return (
		<VStack gap={'8'} maxWidth>
			<Text className={classes.text}>{label}:</Text>
			{/*<Input*/}
			{/*	theme={InputThemeTypes.ROUNDED}*/}
			{/*	value={inputValue}*/}
			{/*	onChange={onChange}*/}
			{/*	disabled={disabled}*/}
			{/*	delay={delay}*/}
			{/*	width={inputWidth}*/}
			{/*	type={type}*/}
			{/*	min={min}*/}
			{/*	max={max}*/}
			{/*/>*/}
			<DebouncedInput
				value={inputValue}
				theme={SimpleInputThemeTypes.ROUNDED}
				disabled={disabled}
				onChange={onChange}
				delay={delay}
				width={inputWidth}
				type={type}
				min={min}
				max={max}
			/>
		</VStack>
	);
};
