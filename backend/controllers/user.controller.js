import User from '../models/user.model.js';

export const getUsersForSideBar = async (req, res) => {
	try {
		const loggedUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedUserId } }).select('-password');

		res.status(200).json(filteredUsers);
	} catch (e) {
		console.log('Error getting users for side bar: ', e);
		res.status(500).json({ error: 'Internal server error' });
	}
};
