import { StateSchema } from 'app/providers/StoreProvider';

export const selectUsersIsLoading = (state: StateSchema) => state.users.isLoading || false;
export const selectUsersError = (state: StateSchema) => state.users.error;
