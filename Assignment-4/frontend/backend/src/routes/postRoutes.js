import { Router } from 'express';
import { body } from 'express-validator';
import { authRequired } from '../middleware/auth.js';
import {
	createPost,
	getAllPosts,
	getPostsByUser,
	getPostById,
	updatePost,
	deletePost,
} from '../controllers/postController.js';

const router = Router();

router.post(
	'/',
	authRequired,
	[
		body('title').isString().trim().notEmpty(),
		body('content').isString().trim().notEmpty(),
		body('author').isString().notEmpty(),
	],
	createPost
);

router.get('/', getAllPosts);
router.get('/user/:userId', getPostsByUser);
router.get('/:id', getPostById);

router.put(
	'/:id',
	authRequired,
	[
		body('title').optional().isString().trim().notEmpty(),
		body('content').optional().isString().trim().notEmpty(),
	],
	updatePost
);

router.delete('/:id', authRequired, deletePost);

export default router;
