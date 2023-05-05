import { useEffect, useState } from 'react';
import { useSelectProcAuthData } from 'entities/ProcAuthLogin';
import { InputBlock } from 'widgets/InputBlock/InputBlock';


export const UserInputBlock = () => {
	const authData = useSelectProcAuthData();
	const [userFullName, setUserFullName] = useState<string>('');

	useEffect(() => {
		setUserFullName(`${authData?.lastName} ${authData?.firstName.charAt(0)}.${authData?.thirdName ? ' '+authData?.thirdName.charAt(0)+'.' : ''}`);
	}, [authData?.lastName, authData?.firstName, authData?.thirdName]);

	return (
		<InputBlock
			label={'Пользователь'}
			value={userFullName}
			disabled={true}
			delay={0}
		/>
	);
};
