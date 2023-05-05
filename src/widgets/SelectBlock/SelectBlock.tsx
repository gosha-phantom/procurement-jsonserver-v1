import { ChangeEvent } from 'react';
import { Select, SelectOptionType, SelectThemeEnum, SelectWidthEnum, Text, VStack } from 'shared/ui';
import classes from './SelectBlock.module.scss';

interface SelectBlockProps {
    label?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (value: ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOptionType[];
    isLoading?: boolean;
    isError?: boolean;
    error?: string;
    width?: SelectWidthEnum;
}

export const SelectBlock = (props: SelectBlockProps) => {
	const {
		label, disabled, value = '', onChange, options, isError, error, width,
	} = props;

	return (
		<VStack gap={'8'} maxWidth>
			<Text className={classes.text}>{label}:</Text>
			<Select
				className={classes.select}
				disabled={disabled}
				theme={SelectThemeEnum.ROUNDED}
				onChange={onChange}
				options={options}
				value={value}
				width={width}
			/>
			{isError && (<Text color={'red'} className={classes.text}>{error}:</Text>)}
		</VStack>
	);
};
