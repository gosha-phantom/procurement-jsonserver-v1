import { ChangeEvent, memo, SelectHTMLAttributes, useMemo, useState } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui';
import classes from './Select.module.scss';

export interface SelectOption {
    value: string;
    key: string;
}

export enum SelectSizeTypes {
    SMALL = 'size-small',
    MEDIUM = 'size-medium',
    LARGE = 'size-large'
}

export enum SelectThemeTypes {
    CLEAR = 'theme-clear',
    RED = 'theme-red',
    NORMAL = 'theme-normal',
    UNDERLINED = 'theme-underlined',
    ROUNDED = 'theme-rounded',
}

export enum SelectTextAlignTypes {
    START = 'text-align-start',
    CENTER = 'text-align-center',
    END = 'text-align-end'
}

export enum SelectBGColorTypes {
    NONE = 'bg-color-none',
    WHITE = 'bg-color-white',
    PRIMARY = 'bg-color-primary',
    INVERTED = 'bg-color-inverted'
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    disabled?: boolean;
    textAlign?: SelectTextAlignTypes;
    size?: SelectSizeTypes;
    theme?: SelectThemeTypes;
    bg_color?: SelectBGColorTypes;
}

export const Select = memo((props: SelectProps) => {
	const {
		className, label, options, value: initialValue, disabled, onChange,
		textAlign = SelectTextAlignTypes.CENTER,
		size = SelectSizeTypes.MEDIUM,
		theme = SelectThemeTypes.ROUNDED,
		bg_color = SelectBGColorTypes.NONE,
		...otherProps
	} = props;
	const [value, setValue] = useState(initialValue);

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		setValue(e.target.value);
		onChange?.(e);
	};

	const optionList = useMemo(() => (
		options?.map(option => (
			<option key={option.key} value={option.key}>{option.value}</option>
		))
	), [options]);

	const mods: Mods = {
		[classes.disabled]: disabled,
		[classes[textAlign]]: true,
		[classes[size]]: true,
		[classes[theme]]: true,
		[classes[bg_color]]: true,
	};

	return (
		<VStack gap={'8'} align={'center'}>
			{label && (
				<span className={classes.label}>{label}</span>
			)}
			<select
				className={classNames(classes.select, mods, [className])}
				onChange={onChangeHandler}
				value={value}
				disabled={disabled}
				{...otherProps}
			>{optionList}</select>
		</VStack>

	);
});
