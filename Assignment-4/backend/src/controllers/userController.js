import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

function createToken(userId) {
	const secret = process.env.JWT_SECRET || 'dev_secret';
	return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
}

export async function register(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { name, email, password } = req.body;
	try {
		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(400).json({ message: 'Email already in use' });
		}
		const user = await User.create({ name, email, password });
		const token = createToken(user._id.toString());
		return res.status(201).json({ id: user._id, name: user.name, email: user.email, token });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
}

export async function login(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: 'Invalid credentials' });
		const match = await user.comparePassword(password);
		if (!match) return res.status(400).json({ message: 'Invalid credentials' });
		const token = createToken(user._id.toString());
		return res.json({ message: 'Login successful', token });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
}

export async function listUsers(req, res) {
	try {
		const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
		return res.json(users);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
}
