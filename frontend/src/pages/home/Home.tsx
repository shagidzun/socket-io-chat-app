import { Sidebar } from '../../components/sidebar/Sidebar.tsx';
import { Chat } from '../../components/chat/Chat.tsx';

export const Home = () => {
	return (
		<div className="m-auto flex h-[500px] text-gray-300 backdrop-blur-lg">
			<Sidebar />
			<Chat />
		</div>
	);
};
