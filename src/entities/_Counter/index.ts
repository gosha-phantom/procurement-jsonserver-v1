// export scheme
export { type CounterSchema } from './model/types/CounterSchema';

// export selectors
export { getCounterValue } from './model/selectors/getCounterValue';

// export reducer and actions
export { counterReducer, counterActions } from './model/slice/counterSlice';

// export counter ui
export { Counter } from './ui/Counter';
