import { Friend } from './Friend.tsx';
import { User } from '../../api/users/getUsers.ts';
import { useSocketContext } from '../../context/SocketContext.tsx';

interface FriendListProps {
	friends: User[];
}

export const FriendList = ({ friends }: FriendListProps) => {
	const socketContext = useSocketContext();
	return (
		<div className="flex flex-col overflow-auto">
			{friends.map((friend) => {
				return <Friend key={friend._id} friend={friend} handleClick={() => {}} socketContext={socketContext} />;
			})}
		</div>
	);
};
