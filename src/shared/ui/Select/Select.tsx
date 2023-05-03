import { ChangeEvent, memo, SelectHTMLAttributes, useMemo, useState } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui';
import classes from './Select.module.scss';

export enum SelectWidthEnum {
    MAX_WIDTH = 'max-width',
    HALF_WIDTH = 'half-width',
    QUARTER_WIDTH = 'quarter-width',
}

export interface SelectOptionType {
    value: string;
    key: string;
}

export enum SelectSizeEnum {
    SMALL = 'size-small',
    MEDIUM = 'size-medium',
    LARGE = 'size-large'
}

export enum SelectThemeEnum {
    CLEAR = 'theme-clear',
    RED = 'theme-red',
    NORMAL = 'theme-normal',
    UNDERLINED = 'theme-underlined',
    ROUNDED = 'theme-rounded',
}

export enum SelectTextAlignEnum {
    START = 'text-align-start',
    CENTER = 'text-align-center',
    END = 'text-align-end'
}

export enum SelectBGColorEnum {
    NONE = 'bg-color-none',
    WHITE = 'bg-color-white',
    PRIMARY = 'bg-color-primary',
    INVERTED = 'bg-color-inverted'
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    className?: string;
    label?: string;
    options?: SelectOptionType[];
    value?: string;
    disabled?: boolean;
    textAlign?: SelectTextAlignEnum;
    size?: SelectSizeEnum;
    theme?: SelectThemeEnum;
    bg_color?: SelectBGColorEnum;
    width?: SelectWidthEnum;
}

export const Select = memo((props: SelectProps) => {
	const {
		className, label, options, value: initialValue, disabled, onChange,
		textAlign = SelectTextAlignEnum.CENTER,
		size = SelectSizeEnum.MEDIUM,
		theme = SelectThemeEnum.ROUNDED,
		bg_color = SelectBGColorEnum.NONE,
		width = SelectWidthEnum.MAX_WIDTH,
		defaultValue,
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
		[classes[width]]: true,
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
				defaultValue={defaultValue}
				{...otherProps}
			>{optionList}</select>
		</VStack>

	);
});
