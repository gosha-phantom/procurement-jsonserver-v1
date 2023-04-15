export type {
	ProcOrderCreateBody, ProcOrderCreateID, ProcOrderPosesCreateBody, ProcOrderCreateSchema
} from './model/procOrderCreate.types';

export {
	postProcOrderCreate,
} from './model/procOrderCreate.services';

export {
	procOrderCreateActions, procOrderCreateReducer
} from './model/procOrderCreate.slice';
