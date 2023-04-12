import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from './users.types';
import { ThunkConfig } from 'shared/config/stateConfig/StateSchema';
import { axiosInstance } from 'shared/axios/axiosInstance';

export const getUsers = createAsyncThunk<UserType[], void, ThunkConfig<string>>(
	'users/getUsers',
	async(_, thunkApi) => {
		try {
			const response = await axiosInstance.get<UserType[]>('/user');

			if (!response.data) { throw new Error('Axios error by getting users from DB!'); }

			const users = response.data.map((user) => {
				return { id: user.id, firstName: user.firstName, lastName: user.lastName };
			});

			return users;
		} catch(error) {
			console.log(error);
			return thunkApi.rejectWithValue('Error by getting users from DB!');
		}
	}
);
