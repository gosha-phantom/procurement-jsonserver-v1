import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { UsersSchema, UserType } from './users.types';
import { getUsers } from './users.services';

const usersAdapter = createEntityAdapter<UserType>({
	selectId: (user) => user.id,
	sortComparer: (a, b) => a.id.toString().localeCompare(b.id.toString()),
});

export const selectUsers = usersAdapter.getSelectors<StateSchema>(
	(state) => state.users || usersAdapter.getInitialState(),
);

const usersSlice = createSlice({
	name: 'usersSlice',
	initialState: usersAdapter.getInitialState<UsersSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				usersAdapter.setAll(state, action.payload);
			});
	}
});

export const {
	reducer: usersReducer,
	actions: usersActions,
} = usersSlice;
