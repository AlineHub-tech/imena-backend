const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// Create
router.post('/', async (req, res) => {
    try { const newMember = new Member(req.body); await newMember.save(); res.status(201).json(newMember); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

// Read All
router.get('/', async (req, res) => {
    try { const members = await Member.find(); res.json(members); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

// Update
router.put('/:id', async (req, res) => {
    try { const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(updated); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

// Delete
router.delete('/:id', async (req, res) => {
    try { await Member.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
