export interface IMessage {
	_id: string;
	senderId: string;
	receiverId: string;
	message: string;
	createdAt: string;
	updatedAt: string;
}

export interface ISendMessageBody {
	senderId: string;
	receiverId: string;
	message: string;
}
