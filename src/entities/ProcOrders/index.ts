export type {
	ProcOrder, ProcOrderSchema,
} from './model/procOrders.types';

export {
	getProcOrders, getProcOrdersByUserID, deleteProcOrdersByOrderID,
} from './model/procOrders.services';

export { procOrdersReducer, procOrdersActions } from './model/procOrders.slice';

export {
	selectProcOrdersIsLoading, selectProcOrdersError,
	selectProcOrdersAll, selectProcOrdersById, selectProcOrdersMyOrders
} from './model/procOrders.selectors';
