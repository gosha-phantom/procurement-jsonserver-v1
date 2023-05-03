import { procAuthLoginReducer, useSelectProcAuthData } from 'entities/ProcAuthLogin';
import { useEffect, useRef, useState } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib';
import { SimpleInputWidthEnum } from 'shared/ui';
import { InputBlock } from './InputBlock/InputBlock';

const reducers: ReducersList = {
	procAuthLogin: procAuthLoginReducer
};

export const UserInputBlock = () => {
	const authData = useSelectProcAuthData();
	const [userFullName, setUserFullName] = useState<string>('');

	useEffect(() => {
		setUserFullName(`${authData?.lastName} ${authData?.firstName.charAt(0)}.${authData?.thirdName ? ' '+authData?.thirdName.charAt(0)+'.' : ''}`);
	}, [authData?.lastName, authData?.firstName, authData?.thirdName]);

	// const userFullName = useRef<string>('');
	//
	// useEffect(() => {
	// 	userFullName.current = (`${authData?.lastName} ${authData?.firstName.charAt(0)}.${authData?.thirdName ? ' '+authData?.thirdName.charAt(0)+'.' : ''}`);
	// }, [authData?.lastName, authData?.firstName, authData?.thirdName]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<InputBlock
				label={'Пользователь'}
				inputValue={userFullName}
				disabled={true}
				inputWidth={SimpleInputWidthEnum.QUARTER_WIDTH}
			/>
		</DynamicModuleLoader>
	);
};
