import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { buildSelector } from 'shared/lib';
import { selectWarehouses } from './warehouse.slice';

// export const selectWarehousesIsLoading = (state: StateSchema) => state.warehouses?.isLoading || false;
// export const selectWarehousesError = (state: StateSchema) => state.warehouses?.error || undefined;
// export const selectWarehousesAll = selectWarehouses.selectAll;
// export const selectWarehouseById = (id: number) => (state: StateSchema) => selectWarehouses.selectById(state, id);

export const [useSelectWarehousesIsLoading, selectWarehousesIsLoading] = buildSelector((state: StateSchema) => state.warehouses?.isLoading || false);
export const [useSelectWarehousesError, selectWarehousesError] = buildSelector((state: StateSchema) => state.warehouses?.error || undefined);
export const [useSelectWarehousesAll, selectWarehousesAll] = buildSelector(selectWarehouses.selectAll);
export const selectWarehouseById = (id: number) => (state: StateSchema) => selectWarehouses.selectById(state, id);
