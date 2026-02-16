const express = require('express');
const router = express.Router();
const Collaborator = require('../models/Collaborator');

// 1. Gushyiraho umufatanyabikorwa mushya (Create)
router.post('/', async (req, res) => {
    try {
        const newCollab = new Collaborator(req.body);
        const savedCollab = await newCollab.save();
        res.status(201).json(savedCollab);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 2. Gusoma abafatanyabikorwa bose (Read)
router.get('/', async (req, res) => {
    try {
        const collabs = await Collaborator.find();
        res.json(collabs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Guhindura amakuru y'umufatanyabikorwa (Update)
router.put('/:id', async (req, res) => {
    try {
        const updatedCollab = await Collaborator.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedCollab);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. Gusiba umufatanyabikorwa (Delete)
router.delete('/:id', async (req, res) => {
    try {
        await Collaborator.findByIdAndDelete(req.params.id);
        res.json({ message: "Collaborator deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
