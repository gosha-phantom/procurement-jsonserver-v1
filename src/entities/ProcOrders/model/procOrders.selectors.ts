import { StateSchema } from 'app/providers/StoreProvider';

export const selectProcOrdersIsLoading = (state: StateSchema) => state.procOrders.isLoading;
export const selectProcOrdersError = (state: StateSchema) => state.procOrders.error;
