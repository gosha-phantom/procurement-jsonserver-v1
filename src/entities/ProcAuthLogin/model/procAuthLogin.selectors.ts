import { StateSchema } from 'shared/config/stateConfig/StateSchema';

export const selectProcAuthDataIsLoading = (state: StateSchema) => state.procAuthLogin.isLoading;
export const selectProcAuthDataError = (state: StateSchema) => state.procAuthLogin.error;

export const selectProcAuthDataAll = (state: StateSchema) => state.procAuthLogin.data;
export const selectProcAuthDataToken = (state: StateSchema) => state.procAuthLogin.data?.token;
export const selectProcAuthData = (state: StateSchema) => state.procAuthLogin.data?.data;
