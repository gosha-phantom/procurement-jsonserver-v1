import { StateSchema } from 'app/providers/StoreProvider';
import { selectWarehouses } from './warehouse.slice';

export const selectWarehousesIsLoading = (state: StateSchema) => state.warehouses.isLoading || false;
export const selectWarehousesError = (state: StateSchema) => state.warehouses.error;
export const selectWarehousesAll = selectWarehouses.selectAll;
export const selectWarehouseById = (id: number) => (state: StateSchema) => selectWarehouses.selectById(state, id);
