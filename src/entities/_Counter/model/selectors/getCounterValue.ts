import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { getCounter } from './getCounter';
import { CounterSchema } from 'entities/_Counter';

export const getCounterValue = (state: StateSchema) => state.counter.value;

// export const getCounterValue = createSelector(
// 	getCounter,
// 	(counter: CounterSchema) => counter.value
// );
