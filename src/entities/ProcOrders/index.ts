export type {
	ProcOrder, ProcOrderSchema,
} from './model/procOrders.types';

export {
	getProcOrders, getProcOrdersByUserID,
} from './model/procOrders.services';

export { procOrdersReducer, procOrdersActions } from './model/procOrders.slice';

export {
	selectProcOrdersIsLoading, selectProcOrdersError,
	selectProcOrdersAll, selectProcOrdersById,
} from './model/procOrders.selectors';

export { ProcOrdersTable } from './ui/ProcOrdersTable';
