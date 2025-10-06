import jwt from 'jsonwebtoken';

export function authRequired(req, res, next) {
	const header = req.headers.authorization || '';
	const token = header.startsWith('Bearer ') ? header.slice(7) : null;
	if (!token) {
		return res.status(401).json({ message: 'Authorization token missing' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
		req.user = { id: decoded.id };
		return next();
	} catch (e) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
}
