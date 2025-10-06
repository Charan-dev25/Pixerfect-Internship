import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, listUsers } from '../controllers/userController.js';

const router = Router();

router.post(
	'/register',
	[
		body('name').isString().trim().notEmpty(),
		body('email').isEmail().normalizeEmail(),
		body('password').isString().isLength({ min: 6 }),
	],
	register
);

router.post(
	'/login',
	[
		body('email').isEmail().normalizeEmail(),
		body('password').isString().notEmpty(),
	],
	login
);

router.get('/', listUsers);

export default router;
