import { forwardRef } from 'react';

export interface MessageProps {
	isTheUser: boolean;
	senderName: string;
	message: string;
	img: string;
	time: string;
}

export const Message = forwardRef<HTMLDivElement, MessageProps>(
	({ senderName, message, img, time, isTheUser }, ref) => {
		return (
			<div className={`chat ${isTheUser ? 'chat-end' : 'chat-start'}`} ref={ref}>
				<div className="avatar chat-image">
					<div className="w-10 rounded-full">
						<img alt="Tailwind CSS chat bubble component" src={img} />
					</div>
				</div>
				<div className="chat-header">
					<span className="mr-1">{senderName}</span>
					<time className="text-xs opacity-50">{time}</time>
				</div>
				<div className={`chat-bubble break-words ${isTheUser ? 'bg-blue-500' : ''}`}>{message}</div>
				{/*<div className="chat-footer opacity-50">Delivered</div>*/}
			</div>
		);
	}
);
