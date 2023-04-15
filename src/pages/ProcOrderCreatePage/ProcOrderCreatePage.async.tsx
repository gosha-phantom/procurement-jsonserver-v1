import { lazy } from 'react';

export const ProcOrderCreatePageAsync = lazy(() => new Promise((resolve) => {
	// ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
	// @ts-ignore
	setTimeout(() => resolve(import('./ProcOrderCreatePage')), 1000);
}));
