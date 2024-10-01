import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.tsx';

interface IProtectedRoute {
	children: ReactNode;
}
export const ProtectedRoute = ({ children }: IProtectedRoute) => {
	const authContext = useAuthContext();
	if (!authContext || !authContext.authUserMemoized) {
		return <Navigate to="/login" replace />;
	}
	return children;
};
