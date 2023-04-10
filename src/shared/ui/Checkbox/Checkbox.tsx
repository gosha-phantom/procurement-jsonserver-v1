import { memo } from 'react';
import { SimpleInput, SimpleInputProps } from 'shared/ui';
import { classNames } from 'shared/lib';
import classes from './Checkbox.module.scss';

interface CheckboxProps extends Omit<SimpleInputProps, 'value'> {
    className?: string;
    checked?: boolean
}

export const Checkbox = memo((props: CheckboxProps) => {
	const { className, checked } = props;

	return (
		<SimpleInput
			className={classNames(classes.Checkbox, {}, [className])}
			checked={checked}
		/>
	);
});


