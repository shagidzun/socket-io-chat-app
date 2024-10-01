import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.tsx';

interface IProtectedAuth {
	children: ReactNode;
}
export const ProtectedAuth = ({ children }: IProtectedAuth) => {
	const authContext = useAuthContext();
	if (authContext && authContext.authUserMemoized) {
		return <Navigate to="/" replace />;
	}
	return children;
};
