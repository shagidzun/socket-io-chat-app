import { SearchInput } from './SearchInput.tsx';
import { FriendList } from './FriendList.tsx';
import { useEffect, useRef, useState } from 'react';
import { useLogOut } from '../../api/auth/logout.ts';
import { useGetUsers } from '../../api/users/getUsers.ts';

export const Sidebar = () => {
	const searchInputRef = useRef<HTMLInputElement>(null);
	const { data } = useGetUsers();
	const [users, setUsers] = useState(data);
	const { mutate: logout } = useLogOut();

	const handleLogOut = () => {
		logout();
	};
	const handleChange = () => {
		if (searchInputRef.current?.value) {
			const lowerCasedSearch = searchInputRef.current.value.toLowerCase();
			const filteredUsers = data?.filter((user) => user.fullName.toLowerCase().includes(lowerCasedSearch ?? ''));
			setUsers(filteredUsers);
		} else {
			setUsers(data);
		}
	};

	useEffect(() => {
		setUsers(data);
	}, [data]);

	return (
		<div className="flex h-full flex-col">
			<SearchInput ref={searchInputRef} handleClick={handleChange} />
			<FriendList friends={users ?? []} />

			<button onClick={handleLogOut} className="btn btn-secondary btn-active mt-auto">
				Log out
			</button>
		</div>
	);
};
