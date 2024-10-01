import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';
import { ISignupInput } from '../pages/signup/Signup.tsx';

interface IContext {
	authUserMemoized: (ISignupInput & { _id: string; profilePic: string }) | null;
	setAuthUser: Dispatch<SetStateAction<IContext['authUserMemoized']>>;
}

export const AuthContext = createContext<IContext | null>(null);

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser') ?? 'null'));

	const authUserMemoized = useMemo(() => {
		return authUser;
	}, [authUser]);

	return <AuthContext.Provider value={{ authUserMemoized, setAuthUser }}>{children}</AuthContext.Provider>;
};
