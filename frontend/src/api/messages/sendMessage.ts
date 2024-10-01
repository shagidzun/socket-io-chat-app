import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConversation } from '../../store/useConversation.ts';
import { axiosApi } from '../../utils/axios.api.ts';
import { apiRoutes } from '../../routes/api.routes.ts';
import { useAuthContext } from '../../context/AuthContext.tsx';
import { ISendMessageBody } from './types.ts';

export const useSendMessage = () => {
	const queryClient = useQueryClient();
	const { messages, setMessages, selectedConversation } = useConversation();
	const authContext = useAuthContext();
	return useMutation({
		mutationFn: async (message: string) => {
			if (authContext && authContext.authUserMemoized && selectedConversation) {
				try {
					const messageObj: ISendMessageBody = {
						senderId: authContext.authUserMemoized._id,
						receiverId: selectedConversation?._id,
						message,
					};
					await axiosApi.post(`${apiRoutes.messages.send}/${selectedConversation._id}`, messageObj);
					await queryClient.invalidateQueries({ queryKey: ['Messages', selectedConversation] });
					setMessages([...messages, messageObj]);
				} catch (err) {
					console.log(err);
				}
			}
		},
	});
};
