import { lazy } from 'react';

export const TemplatePage2Async = lazy(() => new Promise((resolve) => {
	// ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
	// @ts-ignore
	setTimeout(() => resolve(import('./TemplatePage2')), 1000);
}));
