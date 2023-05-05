import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { buildSelector } from 'shared/lib';

export const [ useSelectProcOrderPosesIsLoading, selectProcOrderPosesIsLoading ] =
    buildSelector((state: StateSchema) => state.procOrderPosesUpsert?.isLoading);
export const [ useSelectProcOrderPosesError, selectProcOrderPosesError ] =
    buildSelector((state: StateSchema) => state.procOrderPosesUpsert?.error);
export const [ useSelectProcOrderPoses, selectProcOrderPoses ] =
    buildSelector((state: StateSchema) => state.procOrderPosesUpsert?.procOrderPoses);
export const [ useSelectProcOrderPosesEdit, selectProcOrderPosesEdit ] =
    buildSelector((state: StateSchema) => state.procOrderPosesUpsert?.procOrderPosesEdit);
export const [ useSelectProcOrderPosesCanClearState, selectProcOrderPosesCanClearState ] =
    buildSelector((state: StateSchema) => state.procOrderPosesUpsert?.canClearState);

// export const selectProcOrderPosesByID = (ID: string) => (state: StateSchema) => {
//     state.procOrderCreate?.procOrderPosesAll?.find(item => item.ID === ID);
// };
