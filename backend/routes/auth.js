import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_secret_key_here', {
        expiresIn: '30d'
    });
    res.status(statusCode).json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role, xp: user.xp || 0 } });
};

router.post('/register', [
    body('name', 'Please add a name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const { name, email, password, role } = req.body;
        
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        user = await User.create({ name, email, password, role });
        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

router.post('/login', [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

export default router;
