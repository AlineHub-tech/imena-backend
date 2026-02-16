const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// 1. POST: Kwandika umunyamuryango mushya (Create)
router.post('/', async (req, res) => {
    try {
        const newMember = new Member(req.body);
        const savedMember = await newMember.save();
        res.status(201).json(savedMember);
    } catch (err) {
        res.status(400).json({ message: "Kwandika umunyamuryango byanze: " + err.message });
    }
});

// 2. GET: Gusoma abanyamuryango bose (Read)
router.get('/', async (req, res) => {
    try {
        const members = await Member.find().sort({ createdAt: -1 });
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. PUT: Guhindura amakuru y'umunyamuryango (Update/Edit)
router.put('/:id', async (req, res) => {
    try {
        const updatedMember = await Member.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. DELETE: Gusiba umunyamuryango (Delete)
router.delete('/:id', async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.json({ message: "Umunyamuryango yasibwe neza!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
