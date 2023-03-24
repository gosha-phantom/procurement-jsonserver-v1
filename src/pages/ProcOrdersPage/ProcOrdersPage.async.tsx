import { lazy } from 'react';

export const ProcOrdersPageAsync = lazy(() => new Promise((resolve) => {
	// ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
	// @ts-ignore
	setTimeout(() => resolve(import('./ProcOrdersPage')), 1000);
}));
