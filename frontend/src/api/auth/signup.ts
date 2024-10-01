import { useMutation } from '@tanstack/react-query';
import { axiosApi } from '../../utils/axios.api.ts';
import { apiRoutes } from '../../routes/api.routes.ts';
import { ISignupInput } from '../../pages/signup/Signup.tsx';
import { useAuthContext } from '../../context/AuthContext.tsx';

export const useSignup = () => {
	const authContext = useAuthContext();
	return useMutation({
		mutationFn: async (data: ISignupInput) => {
			const { data: userData } = await axiosApi.post(apiRoutes.auth.signup, data);
			localStorage.setItem('authUser', JSON.stringify(userData));
			if (authContext) {
				authContext.setAuthUser(userData);
			}
		},
	});
};
