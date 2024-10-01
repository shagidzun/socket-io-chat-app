import { Head } from './Head.tsx';
import { ChatMessages } from './ChatMessages.tsx';
import { MessageInput } from './MessageInput.tsx';
import { useConversation } from '../../store/useConversation.ts';
import { useEffect, useRef } from 'react';
import { useAuthContext } from '../../context/AuthContext.tsx';
import { useGetMessages } from '../../api/messages/getMessages.ts';
import { useSendMessage } from '../../api/messages/sendMessage.ts';

export const Chat = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const authContext = useAuthContext();
	const { data } = useGetMessages();
	const { mutate: sendMessage } = useSendMessage();
	const messageInputRef = useRef<HTMLInputElement>(null);

	console.log(data);

	const handleSendMessage = () => {
		if (messageInputRef.current?.value) {
			sendMessage(messageInputRef.current.value);
			messageInputRef.current.value = '';
		}
	};

	useEffect(() => {
		return () => {
			setSelectedConversation(null);
		};
	}, [setSelectedConversation]);

	return (
		<div className="flex w-80 flex-col">
			{selectedConversation ? (
				<>
					<Head username={selectedConversation?.fullName ?? ''} />
					<ChatMessages messages={data ?? []} />
					<MessageInput handleClick={handleSendMessage} ref={messageInputRef} />
				</>
			) : (
				<div className="m-auto">Choose a conversation, {authContext?.authUserMemoized?.fullName ?? ''}</div>
			)}
		</div>
	);
};
