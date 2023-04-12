import { StateSchema } from 'shared/config/stateConfig/StateSchema';

export const getCounterValue = (state: StateSchema) => state.counter.value;
