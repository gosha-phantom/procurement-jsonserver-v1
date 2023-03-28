export type { ProcOrder, ProcOrderSchema } from './model/procOrders.types';

export { getProcOrders } from './model/procOrders.services';

export { procOrdersReducer, procOrdersActions } from './model/procOrders.slice';

export { selectProcOrdersIsLoading, selectProcOrdersError } from './model/procOrders.selectors';
export { selectProcOrders } from './model/procOrders.slice';

export { ProcOrdersTable } from './ui/ProcOrdersTable';
