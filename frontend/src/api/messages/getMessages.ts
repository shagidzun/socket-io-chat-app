import { useQuery } from '@tanstack/react-query';
import { axiosApi } from '../../utils/axios.api.ts';
import { apiRoutes } from '../../routes/api.routes.ts';
import { useConversation } from '../../store/useConversation.ts';
import { IMessage } from './types.ts';

export const useGetMessages = () => {
	const { selectedConversation, setMessages } = useConversation();
	return useQuery({
		queryKey: ['Messages', selectedConversation],
		queryFn: async () => {
			if (selectedConversation) {
				try {
					const { data } = await axiosApi.get<IMessage[]>(
						`${apiRoutes.messages.getMessages}/${selectedConversation._id}`
					);
					setMessages(data);
					return data;
				} catch (err) {
					console.log(err);
				}
			}
		},
	});
};
