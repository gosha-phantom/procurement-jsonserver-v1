export type { UserType, UsersSchema } from './model/users.types';

export { getUsers } from './model/users.services';

export { usersReducer, usersActions } from './model/users.slice';

export { selectUsersIsLoading, selectUsersError } from './model/users.selectors';
export { selectUsers } from './model/users.slice';
