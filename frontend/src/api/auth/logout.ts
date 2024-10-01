import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.tsx';
import { useMutation } from '@tanstack/react-query';
import { axiosApi } from '../../utils/axios.api.ts';
import { apiRoutes } from '../../routes/api.routes.ts';

export const useLogOut = () => {
	const authContext = useContext(AuthContext);
	return useMutation({
		mutationFn: async () => {
			try {
				await axiosApi.post(apiRoutes.auth.logout);
				localStorage.removeItem('authUser');
				authContext?.setAuthUser(null);
			} catch (err) {
				console.error(err);
			}
		},
	});
};
