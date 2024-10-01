import { useMutation } from '@tanstack/react-query';
import { axiosApi } from '../../utils/axios.api.ts';
import { apiRoutes } from '../../routes/api.routes.ts';
import { ILoginInput } from '../../pages/login/Login.tsx';
import { useAuthContext } from '../../context/AuthContext.tsx';

export const useLogin = () => {
	const authContext = useAuthContext();
	return useMutation({
		mutationFn: async (data: ILoginInput) => {
			try {
				const { data: userData } = await axiosApi.post(apiRoutes.auth.login, data);
				localStorage.setItem('authUser', JSON.stringify(userData));
				authContext?.setAuthUser(userData);
			} catch (err) {
				console.log(err);
			}
		},
	});
};
