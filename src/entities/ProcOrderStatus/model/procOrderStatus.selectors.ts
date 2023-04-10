import { StateSchema } from 'app/providers/StoreProvider';
import { selectProcOrderStatus } from './procOrderStatus.slice';

export const selectProcOrderStatusIsLoading = (state: StateSchema) => state.procOrderStatus.isLoading || false;
export const selectProcOrderStatusError = (state: StateSchema) => state.procOrderStatus.error;
export const selectProcOrderStatusAll = selectProcOrderStatus.selectAll;
export const selectProcOrderStatusById = (id: number) => (state: StateSchema) => selectProcOrderStatus.selectById(state, id);

