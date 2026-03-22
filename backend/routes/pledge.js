import express from 'express';
import Pledge from '../models/Pledge.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const pledge = await Pledge.create(req.body);
        res.status(201).json({ success: true, data: pledge });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const pledges = await Pledge.findAll({ order: [['createdAt', 'DESC']] });
        const count = await Pledge.count();
        res.status(200).json({ success: true, count, data: pledges });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

export default router;
