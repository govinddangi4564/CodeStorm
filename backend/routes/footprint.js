import express from 'express';
import FootprintLog from '../models/FootprintLog.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/calculate', protect, async (req, res) => {
    try {
        const { transport, energy, diet, shopping } = req.body;
        
        const total_kg_co2 = (Number(transport) * 0.5) + (Number(energy) * 0.3) + (Number(diet) * 2) + (Number(shopping) * 1);

        const log = await FootprintLog.create({
            userId: req.user.id,
            transport,
            energy,
            diet,
            shopping,
            total_kg_co2
        });

        // Award 50 XP to the User
        const dbUser = await User.findByPk(req.user.id);
        if (dbUser) {
            dbUser.xp = (dbUser.xp || 0) + 50;
            await dbUser.save();
        }

        res.status(201).json({ success: true, data: log, xpAwarded: 50, newXp: dbUser ? dbUser.xp : null });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

router.get('/history', protect, async (req, res) => {
    try {
        const history = await FootprintLog.findAll({ 
            where: { userId: req.user.id },
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json({ success: true, count: history.length, data: history });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

export default router;
