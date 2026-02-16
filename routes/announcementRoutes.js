const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// 1. GET: Gusoma amatangazo yose (Aya niyo azajya kuri Member Dashboard)
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 }); // Agashya kaza mbere
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST: Gushyiraho itangazo rishya (Admin Dashboard)
router.post('/', async (req, res) => {
    const announcement = new Announcement({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newAnnounce = await announcement.save();
        res.status(201).json(newAnnounce);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. PUT: Guhindura itangazo (Update)
router.put('/:id', async (req, res) => {
    try {
        const updated = await Announcement.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. DELETE: Gusiba itangazo
router.delete('/:id', async (req, res) => {
    try {
        await Announcement.findByIdAndDelete(req.params.id);
        res.json({ message: "Announcement deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
