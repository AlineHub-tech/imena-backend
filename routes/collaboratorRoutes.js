const express = require('express');
const router = express.Router();
const Collaborator = require('../models/Collaborator');

// 1. POST: Kwandika umufatanyabikorwa mushya (Create)
router.post('/', async (req, res) => {
    try {
        const newCollab = new Collaborator(req.body);
        const saved = await newCollab.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: "Kwandika collab byanze: " + err.message });
    }
});

// 2. GET: Gusoma abafatanyabikorwa bose (Read)
router.get('/', async (req, res) => {
    try {
        const collabs = await Collaborator.find().sort({ createdAt: -1 });
        res.json(collabs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. PUT: Guhindura amakuru (Update)
router.put('/:id', async (req, res) => {
    try {
        const updated = await Collaborator.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. DELETE: Gusiba umufatanyabikorwa
router.delete('/:id', async (req, res) => {
    try {
        await Collaborator.findByIdAndDelete(req.params.id);
        res.json({ message: "Collaborator yasibwe neza!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
