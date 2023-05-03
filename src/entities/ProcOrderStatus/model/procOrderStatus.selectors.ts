import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { buildSelector } from 'shared/lib';
import { selectProcOrderStatus } from './procOrderStatus.slice';

// export const selectProcOrderStatusIsLoading = (state: StateSchema) => state.procOrderStatus?.isLoading || false;
// export const selectProcOrderStatusError = (state: StateSchema) => state.procOrderStatus?.error;
export const selectProcOrderStatusAll = selectProcOrderStatus.selectAll;
export const selectProcOrderStatusById = (id: number) => (state: StateSchema) => selectProcOrderStatus.selectById(state, id);

export const [useSelectProcOrderStatusIsLoading, selectProcOrderStatusIsLoading] =
    buildSelector((state: StateSchema) => state.procOrderStatus?.isLoading || false);
export const [useSelectProcOrderStatusError, selectProcOrderStatusError] =
    buildSelector((state: StateSchema) => state.procOrderStatus?.error || undefined);
// export const [useSelectProcOrderStatusAll, selectProcOrderStatusAll] =
//     buildSelector((state: StateSchema) => selectProcOrderStatus.selectAll || false);
