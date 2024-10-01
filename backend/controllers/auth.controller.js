import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const signUp = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: 'Passwords do not match' });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(401).json({ error: 'User already exists' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === 'male' ? maleProfilePic : femaleProfilePic,
		});

		if (newUser) {
			generateToken(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(401).json({ error: 'Invalid username or password' });
		}
	} catch (e) {
		console.log('Error creating user', e);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

export const logIn = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

		if (!user || !isPasswordCorrect) {
			return res.status(401).json({ error: 'Invalid username or password' });
		}

		generateToken(user._id, res);

		res.status(201).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (e) {
		console.log('Error logging in', e);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

export const logOut = (req, res) => {
	try {
		res.clearCookie('jwt', { maxAge: 0 });
		res.status(200).json({
			message: 'User logged out successfully',
		});
	} catch (e) {
		console.log('Error logging out', e);
		res.status(500).json({ error: 'Something went wrong' });
	}
};
