import { FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as IRLogoFull } from 'shared/assets/logo/ir-full-logo-color.svg';
import { classNames, useAppDispatch } from 'shared/lib';
import {
	Button,
	ButtonThemeTypes,
	HStack,
	Loader,
	LoaderSize,
	Modal,
	SimpleInput,
	SimpleInputThemeTypes,
	Text,
	TextSize,
	VStack,
} from 'shared/ui';
import {
	selectProcAuthData,
	selectProcAuthDataError,
	selectProcAuthDataIsLoading,
	selectProcAuthDataToken
} from '../model/procAuthLogin.selectors';
import { postProcAuthLogin } from '../model/procAuthLogin.services';
import classes from './ProcAuthLoginModal.module.scss';

interface ProcAuthLoginModalProps {
    className?: string;
    isOpen: boolean;
    setIsOpen?: () => void;
}

export const ProcAuthLoginModal = memo((props: ProcAuthLoginModalProps) => {
	const { className, isOpen,setIsOpen } = props;
	const loginRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const [inputError, setInputError] = useState<string>('');
	const [isBtnAuthLoginClicked, setIsBtnAuthLoginClicked ] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const isLoading = useSelector(selectProcAuthDataIsLoading);
	const error = useSelector(selectProcAuthDataError);
	const data = useSelector(selectProcAuthData);
	const token = useSelector(selectProcAuthDataToken);

	const onBtnLoginClick = useCallback(() => {
		setInputError('');
		if (loginRef.current?.value === '') {
			setInputError('Поле "Логин" не может быть пустым');
			loginRef.current?.focus();
			return;
		}
		if (passwordRef.current?.value === '') {
			setInputError('Поле "Пароль" не может быть пустым');
			passwordRef.current?.focus();
			return;
		}
		setIsBtnAuthLoginClicked(true);
		// логика для авторизации пользователя
	}, []);

	useEffect(() => {
		if (isBtnAuthLoginClicked) {
			dispatch(postProcAuthLogin({
				login: loginRef.current?.value,
				password: passwordRef.current?.value,
			}));
			setIsBtnAuthLoginClicked(false);
		}
	}, [isBtnAuthLoginClicked, dispatch]);

	useEffect(() => {
		console.log(token);
	}, [token]);

	return (
		<Modal
			className={classNames(classes.ProcAuthLoginModal, {}, [className])}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
			<HStack gap={'16'} justify={'center'} align={'center'} className={classes.modalContainer} maxWidth>
				<IRLogoFull />
				<Text size={TextSize.LARGE}>Авторизация пользователя</Text>
				<HStack
					as="form"
					align={'center'}
					gap={'8'}
					onSubmit={(e: FormEvent<HTMLElement>) => e.preventDefault()}
				>
					<VStack gap={'8'} align={'center'} justify={'center'} maxWidth>
						<label className={classes.formInputLabel} htmlFor="login">Логин</label>
						<SimpleInput
							theme={SimpleInputThemeTypes.ROUNDED}
							id="login"
							placeholder={'Введите логин'}
							className={classes.formInput}
							required={true}
							ref={loginRef}
						/>
					</VStack>
					<VStack gap={'8'} align={'center'} justify={'center'} maxWidth>
						<label className={classes.formInputLabel} htmlFor="password">Пароль</label>
						<SimpleInput
							theme={SimpleInputThemeTypes.ROUNDED}
							id="password"
							placeholder={'Введите пароль'}
							type="password"
							className={classes.formInput}
							required
							ref={passwordRef}
						/>
					</VStack>
					{inputError && (
						<Text className={classes.errors} size={TextSize.MEDIUM}>{inputError}</Text>
					)}
					<VStack gap={'8'} justify={'center'} align={'center'} className={classes.formButtons}>
						<Button
							className={classes.formButton}
							theme={ButtonThemeTypes.ROUNDED}
							onClick={onBtnLoginClick}
							disabled={isBtnAuthLoginClicked}
						>{!isLoading ? <Loader size={LoaderSize.MEDIUM}/> : 'Авторизация'}</Button>
						<Button
							className={classes.formButton}
							theme={ButtonThemeTypes.ROUNDED}
							onClick={setIsOpen}
						>Отмена</Button>
					</VStack>
				</HStack>
			</HStack>
		</Modal>
	);
});
