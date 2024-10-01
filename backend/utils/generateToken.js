import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

	res.cookie('jwt', token, {
		httpOnly: true,
		maxAge: 15 * 24 * 60 * 60 * 1000,
		sameSite: 'strict',
		secure: process.env.NODE_ENV !== 'development',
	});
};

export default generateToken;
