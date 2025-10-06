import dotenv from 'dotenv';
import app from './app.js';
import { connectToDatabase } from './config/db.js';
import e from 'express';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_api_db';
console.log('MONGODB_URI:', MONGODB_URI);

async function start() {
	try {
		await connectToDatabase(MONGODB_URI);
		app.listen(PORT, () => {
			console.log(`Server listening on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error('Failed to start server:', err.message);
		process.exit(1);
	}
}

start();
