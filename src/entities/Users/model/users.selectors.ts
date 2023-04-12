import { StateSchema } from 'shared/config/stateConfig/StateSchema';
import { selectUsers } from './users.slice';

export const selectUsersIsLoading = (state: StateSchema) => state.users.isLoading || false;
export const selectUsersError = (state: StateSchema) => state.users.error;
export const selectUsersAll = selectUsers.selectAll;
export const selectUserById = (id: number) => (state: StateSchema) => selectUsers.selectById(state, id);
