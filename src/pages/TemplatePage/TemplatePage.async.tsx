import { lazy } from 'react';

export const TemplatePageAsync = lazy(() => new Promise((resolve) => {
	// ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
	// @ts-ignore
	setTimeout(() => resolve(import('./TemplatePage')), 1000);
}));
