import { create } from 'zustand';
import { User } from '../api/users/getUsers.ts';

interface Store {
	selectedConversation: User | null;
	setSelectedConversation: (selectedConversation: Store['selectedConversation']) => void;
	messages: Array<unknown>;
	setMessages: (messages: Store['messages']) => void;
}

export const useConversation = create<Store>((setState) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => setState({ selectedConversation }),
	messages: [],
	setMessages: (messages) => setState({ messages }),
}));
