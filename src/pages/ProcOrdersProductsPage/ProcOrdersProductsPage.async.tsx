import { lazy } from 'react';

export const ProcOrdersProductsPageAsync = lazy(() => new Promise((resolve) => {
	// ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
	// @ts-ignore
	setTimeout(() => resolve(import('./ProcOrdersProductsPage')), 1000);
}));
