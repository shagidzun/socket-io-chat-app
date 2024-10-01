import { useQuery } from '@tanstack/react-query';
import { axiosApi } from '../../utils/axios.api.ts';
import { apiRoutes } from '../../routes/api.routes.ts';

export type User = {
	fullName: string;
	gender: string;
	profilePic: string;
	username: string;
	_id: string;
};

export const useGetUsers = () => {
	return useQuery({
		queryKey: ['Users'],
		queryFn: async () => {
			try {
				const { data } = await axiosApi.get<User[]>(apiRoutes.user);
				return data;
			} catch (err) {
				console.log(err);
			}
		},
	});
};
