import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { selectProcAuthLogin } from './procAuthLogin.slice';

export const selectProcAuthDataIsLoading = (state: StateSchema) => state.procAuthLogin.isLoading;
export const selectProcAuthDataError = (state: StateSchema) => state.procAuthLogin.error;
export const selectProcAuthDataAll = selectProcAuthLogin.selectEntities;
export const selectProcAuthDataToken = createSelector(selectProcAuthDataAll, (state) => state.token);
export const selectProcAuthData = createSelector(selectProcAuthDataAll, (state) => state.data);
