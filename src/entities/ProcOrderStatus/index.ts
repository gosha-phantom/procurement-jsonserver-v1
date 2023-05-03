export type { ProcOrderStatus, ProcOrderStatusSchema } from './model/procOrderStatus.types';

export { getProcOrderStatus } from './model/procOrderStatus.services';

export {
	procOrderStatusReducer, procOrderStatusActions,
	useProcOrderStatusActions
} from './model/procOrderStatus.slice';

export {
	selectProcOrderStatusAll, selectProcOrderStatusById,
	selectProcOrderStatusError, selectProcOrderStatusIsLoading,
	useSelectProcOrderStatusIsLoading, useSelectProcOrderStatusError
} from './model/procOrderStatus.selectors';
