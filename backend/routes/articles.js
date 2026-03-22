import express from 'express';
import Article from '../models/Article.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = req.query.category && req.query.category !== 'All' ? { where: { category: req.query.category } } : {};
        query.order = [['createdAt', 'DESC']];
        const articles = await Article.findAll(query);
        res.status(200).json({ success: true, count: articles.length, data: articles });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ success: false, error: 'Article not found' });
        
        article.views += 1;
        await article.save();

        res.status(200).json({ success: true, data: article });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json({ success: true, data: article });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

router.put('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ success: false, error: 'Article not found' });
        
        await article.update(req.body);
        res.status(200).json({ success: true, data: article });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ success: false, error: 'Article not found' });
        
        await article.destroy();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

export default router;
