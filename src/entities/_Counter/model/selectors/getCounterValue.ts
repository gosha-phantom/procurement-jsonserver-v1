// создание при помощи реселекта
// import { createSelector } from '@reduxjs/toolkit';
// import { getCounter } from './getCounter';
// import { CounterSchema } from 'entities/_Counter';
//
// export const getCounterValue = createSelector(
// 	getCounter,
// 	(counter: CounterSchema) => counter.value
// );

// сохдание с помощью buildSelector
import { buildSelector } from 'shared/lib';

export const [ useCounterValue, getCounterValue] = buildSelector((state) => state.counter.value);

// обычное создание селектора
// import { StateSchema } from 'shared/config/stateConfig/StateSchema';
//
// export const getCounterValue = (state: StateSchema) => state.counter.value;

