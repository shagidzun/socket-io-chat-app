import express from 'express';
import 'dotenv/config';
import appRoutes from './routes/app.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import messagesRoutes from './routes/messages.routes.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';
import { app, server } from './socket/socket.js';
import path from 'path';

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

app.use('/api/auth', appRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});

server.listen(PORT, async () => {
	await connectToMongoDB();
	console.log(`Server started on port ${PORT}`);
});
