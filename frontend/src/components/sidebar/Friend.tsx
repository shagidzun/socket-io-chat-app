import { useConversation } from '../../store/useConversation.ts';
import { User } from '../../api/users/getUsers.ts';
import { ISocketContext } from '../../context/SocketContext.tsx';

export interface FriendProps {
	friend: User;
	handleClick: VoidFunction;
	socketContext: ISocketContext | null;
}

export const Friend = ({ friend, handleClick, socketContext }: FriendProps) => {
	const { profilePic, fullName } = friend;
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isOnline = socketContext?.onlineUsers.includes(friend._id);
	const isSelected = selectedConversation?._id === friend._id;
	const handleSelect = () => {
		setSelectedConversation(friend);
		handleClick();
	};
	return (
		<button className={'btn h-fit ' + (isSelected ? 'bg-blue-400' : '')} onClick={handleSelect}>
			<div className="flex w-full items-center gap-1">
				<div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
					<div className="h-16 rounded-full">
						<img src={profilePic} alt={fullName} />
					</div>
				</div>

				<p className="ml-1 text-center text-gray-800">{fullName}</p>
			</div>
		</button>
	);
};
