import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { selectProcOrders } from './procOrders.slice';

export const selectProcOrdersIsLoading = (state: StateSchema) => state.procOrders.isLoading;
export const selectProcOrdersError = (state: StateSchema) => state.procOrders.error;
export const selectProcOrdersAll = selectProcOrders.selectAll;
export const selectProcOrdersById = (id: number) => (state: StateSchema) => selectProcOrders.selectById(state, id);
export const selectProcOrdersMyOrders = (state: StateSchema) => state.procOrders.myOrders;

// temporary selector for selecting processed data
// export const selectProcessedProcOrderAll = (state: StateSchema) => state.procOrders.processedProcOrders;
