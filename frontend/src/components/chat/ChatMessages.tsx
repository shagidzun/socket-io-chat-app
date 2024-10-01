import { Message } from './message/Message.tsx';
import { IMessage } from '../../api/messages/types.ts';
import { useAuthContext } from '../../context/AuthContext.tsx';
import { useConversation } from '../../store/useConversation.ts';
import { useListenMessages } from '../../../hooks/useListenMessages.ts';
import { useEffect, useRef } from 'react';

interface ChatMessagesProps {
	messages: IMessage[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
	const authContext = useAuthContext();
	const { selectedConversation } = useConversation();
	const lastMessageRef = useRef<HTMLDivElement>(null);

	useListenMessages();

	useEffect(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return messages.length > 0 ? (
		<div className="mt-auto flex flex-col overflow-auto p-3">
			{messages.map((mess, i) => {
				const { _id, message, createdAt, senderId } = mess;
				const isTheUser = authContext?.authUserMemoized?._id === senderId;
				const profilePic = isTheUser ? authContext?.authUserMemoized?.profilePic : selectedConversation?.profilePic;
				const senderName = isTheUser ? authContext?.authUserMemoized?.fullName : selectedConversation?.fullName;
				const isLastMessage = messages.length - 1 === i;
				return (
					<Message
						key={_id}
						isTheUser={isTheUser}
						senderName={senderName ?? ''}
						message={message}
						img={profilePic ?? ''}
						time={createdAt}
						ref={isLastMessage ? lastMessageRef : undefined}
					/>
				);
			})}
		</div>
	) : (
		<p className="m-auto">Say hi</p>
	);
};
