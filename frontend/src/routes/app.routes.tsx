import { Home } from '../pages/home/Home.tsx';
import ErrorPage from '../pages/error/Error.tsx';
import { Login } from '../pages/login/Login.tsx';
import { Signup } from '../pages/signup/Signup.tsx';
import { ProtectedRoute } from '../components/protected/ProtectedRoute.tsx';
import { ProtectedAuth } from '../components/protected/ProtectedAuth.tsx';

export const appRoutes = [
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: '/login',
		element: (
			<ProtectedAuth>
				<Login />
			</ProtectedAuth>
		),
	},
	{
		path: '/signup',
		element: (
			<ProtectedAuth>
				<Signup />
			</ProtectedAuth>
		),
	},
];
