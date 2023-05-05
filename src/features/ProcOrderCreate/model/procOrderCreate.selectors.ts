import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { buildSelector } from 'shared/lib';

export const [ useSelectProcOrderCreateIsLoading, selectProcOrderCreateIsLoading ] =
    buildSelector((state: StateSchema) => state.procOrderCreate?.isLoading);
export const [ useSelectProcOrderCreateError, selectProcOrderCreateError ] =
    buildSelector((state: StateSchema) => state.procOrderCreate?.error);
export const [ useSelectProcOrderCreateID, selectProcOrderCreateID ] =
    buildSelector((state: StateSchema) => state.procOrderCreate?.procOrderID);

