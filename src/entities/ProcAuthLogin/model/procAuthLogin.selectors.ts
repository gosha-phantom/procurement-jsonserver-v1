import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { buildSelector } from 'shared/lib';

// export const selectProcAuthDataIsLoading = (state: StateSchema) => state.procAuthLogin.isLoading;
// export const selectProcAuthDataError = (state: StateSchema) => state.procAuthLogin.error;
//
// export const selectProcAuthDataAll = (state: StateSchema) => state.procAuthLogin.data;
// export const selectProcAuthDataToken = (state: StateSchema) => state.procAuthLogin.data?.token;
// export const selectProcAuthData = (state: StateSchema) => state.procAuthLogin.data?.data;

export const [
	useSelectProcAuthDataIsLoading, selectProcAuthDataIsLoading
] = buildSelector((state: StateSchema) => state.procAuthLogin.isLoading);
export const [
	useSelectProcAuthDataError, selectProcAuthDataError
] = buildSelector((state: StateSchema) => state.procAuthLogin.error);

export const [
	useSelectProcAuthDataAll, selectProcAuthDataAll
] = buildSelector((state: StateSchema) => state.procAuthLogin.data);
export const [
	useSelectProcAuthDataToken, selectProcAuthDataToken
] = buildSelector((state: StateSchema) => state.procAuthLogin.data?.token);
export const [
	useSelectProcAuthData, selectProcAuthData
] = buildSelector((state: StateSchema) => state.procAuthLogin.data?.data);
