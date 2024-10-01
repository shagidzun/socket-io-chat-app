import { useSocketContext } from '../src/context/SocketContext';
import { useConversation } from '../src/store/useConversation';
import { useEffect } from 'react';
import { IMessage } from '../src/api/messages/types';
import { useQueryClient } from '@tanstack/react-query';

export const useListenMessages = () => {
	const queryClient = useQueryClient();
	const socketContext = useSocketContext();
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		if (socketContext && socketContext.socket) {
			const { socket } = socketContext;
			socket.on('newMessage', async (newMessage: IMessage) => {
				await queryClient.invalidateQueries({ queryKey: ['Messages', selectedConversation] });
				setMessages([...messages, newMessage]);
			});

			return () => {
				socket.off('newMessage');
			};
		}
	}, [messages, queryClient, selectedConversation, setMessages, socketContext]);
};
