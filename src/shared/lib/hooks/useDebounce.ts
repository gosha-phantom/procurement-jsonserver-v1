import { MutableRefObject, useCallback, useRef } from 'react';

/**
 * Хук, который позволяет отменять предыдущий вызов функции, пока не пройдет указанная задержка
 * @param callback - функция, которая должна отработать после задержки
 * @param delay - задержка в миллисекундах
 * **/

export function useDebounce (callback: (...args: any[]) => void, delay: number) {
	const timer = useRef() as MutableRefObject<any>;

	return useCallback((...args: any[]) => {
		if (timer.current) {
			clearTimeout(timer.current);
		}
		timer.current = setTimeout(() => {
			callback(...args);
		}, delay);
	}, [callback, delay]);
}
