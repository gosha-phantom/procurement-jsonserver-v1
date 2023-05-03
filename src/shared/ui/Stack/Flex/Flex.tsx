import { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib';
import classes from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexAlignContent = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '12' | '16' | '24' | '32';

const flexJustifyClasses: Record<FlexJustify, string> = {
	start: classes.justifyStart,
	center: classes.justifyCenter,
	end: classes.justifyEnd,
	between: classes.justifyBetween
};

const flexAlignClasses: Record<FlexAlign, string> = {
	start: classes.alignStart,
	center: classes.alignCenter,
	end: classes.alignEnd
};

const flexAlignContentClasses: Record<FlexAlign, string> = {
	start: classes.alignContentStart,
	center: classes.alignContentCenter,
	end: classes.alignContentEnd
};

const flexDirectionClasses: Record<FlexDirection, string> = {
	row: classes.directionRow,
	column: classes.directionColumn
};

const flexGapClasses: Record<FlexGap, string> = {
	4: classes.gap4,
	8: classes.gap8,
	12: classes.gap12,
	16: classes.gap16,
	24: classes.gap24,
	32: classes.gap32
};

// type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

// export interface FlexProps extends DivProps {
//     className?: string;
//     children: ReactNode;
//     justify?: FlexJustify,
//     align?: FlexAlign;
//     alignContent?: FlexAlignContent;
//     direction?: FlexDirection;
//     gap?: FlexGap;
//     maxWidth?: boolean;
// }

export type FlexElements = 'div' | 'section' | 'main' | 'span' | 'p' | 'form';

type FlexAdditionalProps<Type extends FlexElements | ComponentType> =
    Type extends keyof JSX.IntrinsicElements
        ? JSX.IntrinsicElements[Type]
        : ComponentPropsWithoutRef<Type>

export type FlexProps<Type extends FlexElements | ComponentType> = {
    className?: string;
    children?: ReactNode;
    justify?: FlexJustify,
    align?: FlexAlign;
    alignContent?: FlexAlignContent;
    direction?: FlexDirection;
    gap?: FlexGap;
    maxWidth?: boolean;
    as?: Type;
} & FlexAdditionalProps<Type>;

export const Flex = <Type extends FlexElements | ComponentType<any> = 'div'>(props: FlexProps<Type>) => {
	const {
		className, children, as,
		justify = 'start',
		align = 'start',
		alignContent,
		direction = 'row',
		gap = '4',
		maxWidth = true
	} = props;

	const Component = as || 'div';

	const cssClasses = [
		className,
		flexJustifyClasses[justify],
		flexAlignClasses[align],
		flexDirectionClasses[direction],
		flexGapClasses[gap],
		alignContent
			? flexAlignContentClasses[alignContent]
			: '',
	];

	const mods: Mods = {
		[classes.maxWidth]: maxWidth
	};

	return (
		<Component className={classNames(classes.flex, mods, cssClasses)}>
			{children}
		</Component>
	);
};
