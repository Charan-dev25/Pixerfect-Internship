import { validationResult } from 'express-validator';
import Post from '../models/Post.js';

export async function createPost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { title, content, author } = req.body;
	try {
		const post = await Post.create({ title, content, author });
		return res.status(201).json(post);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
}

export async function getAllPosts(req, res) {
	const page = Math.max(parseInt(req.query.page || '1', 10), 1);
	const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 100);
	const skip = (page - 1) * limit;
	try {
		const [items, total] = await Promise.all([
			Post.find({}).populate('author', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
			Post.countDocuments({}),
		]);
		return res.json({ page, limit, total, items });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
}

export async function getPostsByUser(req, res) {
	const { userId } = req.params;
	try {
		const posts = await Post.find({ author: userId }).populate('author', 'name email').sort({ createdAt: -1 });
		return res.json(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
}

export async function getPostById(req, res) {
	const { id } = req.params;
	try {
		const post = await Post.findById(id).populate('author', 'name email');
		if (!post) return res.status(404).json({ message: 'Post not found' });
		return res.json(post);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
}

export async function updatePost(req, res) {
	const { id } = req.params;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { title, content } = req.body;
	try {
		const post = await Post.findByIdAndUpdate(
			id,
			{ $set: { title, content } },
			{ new: true, runValidators: true }
		);
		if (!post) return res.status(404).json({ message: 'Post not found' });
		return res.json(post);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
}

export async function deletePost(req, res) {
	const { id } = req.params;
	try {
		const post = await Post.findByIdAndDelete(id);
		if (!post) return res.status(404).json({ message: 'Post not found' });
		return res.json({ message: 'Post deleted' });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
}
