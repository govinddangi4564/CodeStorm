import express from 'express';
import Challenge from '../models/Challenge.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all active challenges
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.findAll();
        res.status(200).json({ success: true, data: challenges });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// Admin creates a challenge
router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
        const challenge = await Challenge.create(req.body);
        res.status(201).json({ success: true, data: challenge });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// User completes a challenge and earns XP
router.post('/:id/complete', protect, async (req, res) => {
    try {
        let xp_reward = 0;
        const challenge = await Challenge.findByPk(req.params.id);
        
        if (!challenge) {
            // Fallback for unseeded databases (default challenges)
            const defaultChallenges = [{ id: 1, xp: 50 }, { id: 2, xp: 30 }, { id: 3, xp: 20 }];
            const defItem = defaultChallenges.find(c => c.id == req.params.id);
            if(defItem) xp_reward = defItem.xp;
            else return res.status(404).json({ success: false, error: 'Challenge not found' });
        } else {
            xp_reward = challenge.xp_reward;
        }

        const user = await User.findByPk(req.user.id);
        if (user) {
            user.xp = (user.xp || 0) + xp_reward;
            await user.save();
        }

        res.status(200).json({ success: true, xpEarned: xp_reward, totalXp: user ? user.xp : 0, message: 'Challenge Completed!' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

export default router;
