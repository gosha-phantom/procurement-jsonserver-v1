import React from 'react';

// @ts-ignore
export const CheckboxRowSelect = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		// @ts-ignore
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<input
			type="checkbox"
			// @ts-ignore
			ref={resolvedRef}
			{...rest}
		/>
	);
});
