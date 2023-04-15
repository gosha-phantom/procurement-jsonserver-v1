import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { selectProcOrders } from './procOrders.slice';

export const selectProcOrdersIsLoading = (state: StateSchema) => state.procOrders?.isLoading || false;
export const selectProcOrdersError = (state: StateSchema) => state.procOrders?.error || undefined;
export const selectProcOrdersAll = selectProcOrders.selectAll;
export const selectProcOrdersById = (id: number) => (state: StateSchema) => selectProcOrders.selectById(state, id);
export const selectProcOrdersMyOrders = (state: StateSchema) => state.procOrders?.myOrders || false;

// temporary selector for selecting processed data
// export const selectProcessedProcOrderAll = (state: StateSchema) => state.procOrders.processedProcOrders;
