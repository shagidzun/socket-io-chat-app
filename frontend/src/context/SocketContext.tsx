import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useAuthContext } from './AuthContext.tsx';
import { io, Socket } from 'socket.io-client';

export interface ISocketContext {
	socket: Socket | null;
	onlineUsers: Array<unknown>;
}

export const SocketContext = createContext<ISocketContext | null>(null);

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [onlineUsers, setOnlineUsers] = useState<Array<unknown>>([]);
	const authContext = useAuthContext();

	useEffect(() => {
		if (authContext && authContext.authUserMemoized) {
			const socketio = io('http://localhost:3000', {
				query: {
					userId: authContext.authUserMemoized._id,
				},
			});
			setSocket(socketio);

			socketio.on('getOnlineUsers', (users) => {
				setOnlineUsers(users);
			});

			return () => {
				socket?.close();
			};
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authContext]);

	const socketObj = useMemo(() => ({ socket, onlineUsers }), [onlineUsers, socket]);

	return <SocketContext.Provider value={socketObj}>{children}</SocketContext.Provider>;
};
