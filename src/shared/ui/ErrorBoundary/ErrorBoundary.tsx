import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorProps {
    children?: ReactNode;
}

interface ErrorState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
	public state: ErrorState = { hasError: false };

	public static getDerivedStateFromError(_: Error) {
		// Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
		console.log('Uncaught error: ', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			// Можно отрендерить запасной UI произвольного вида
			return <h2>Простите... В приложении произошла ошибка. Рекомендую Вам обновить страницу или обратиться к администратору.</h2>;
		}
		return this.props.children;
	}
}
