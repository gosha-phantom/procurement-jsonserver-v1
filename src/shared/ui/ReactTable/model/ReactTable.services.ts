import axios from 'axios';
import { PostsFromFakeAPI } from './ReactTable.types';

export const getUsersFromFakeAPI = async () => {
	const response = await axios.get<PostsFromFakeAPI[]>('https://jsonplaceholder.typicode.com/posts');

	if (response?.data) { return response.data; }
	return [];
};
