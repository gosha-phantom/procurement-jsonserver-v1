import {
	DebouncedInput,
	SimpleInputElements,
	SimpleInputThemeEnum,
	SimpleInputWidthEnum,
	Text,
	VStack,
} from 'shared/ui';
import classes from './InputBlock.module.scss';

interface InputBlockProps {
    label?: string;
    disabled?: boolean;
    inputValue?: string | number;
    onChange?: (value: string | number) => void;
    delay?: number;
    inputWidth?: SimpleInputWidthEnum;
    type?: string;
    min?: string;
    max?: string;
    as?: SimpleInputElements;
    rows?: number;
}

export const InputBlock = (props: InputBlockProps) => {
	const {
		label, disabled, min, max, onChange, rows,
		inputValue = '',
		delay = 0,
		inputWidth,
		type = 'text',
		as = 'input'
	} = props;

	return (
		<VStack gap={'8'} maxWidth>
			<Text className={classes.text}>{label}:</Text>
			<DebouncedInput
				className={classes.input}
				value={inputValue}
				theme={SimpleInputThemeEnum.ROUNDED}
				disabled={disabled}
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
