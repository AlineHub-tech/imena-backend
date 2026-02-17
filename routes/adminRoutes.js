const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Collaborator = require('../models/Collaborator');
const Attendance = require('../models/Attendance');
const Announcement = require('../models/Announcement');

// --- MEMBER CRUD ---
router.post('/members', async (req, res) => {
    try { const m = new Member(req.body); await m.save(); res.status(201).json(m); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
router.get('/members', async (req, res) => { res.json(await Member.find()); });
router.put('/members/:id', async (req, res) => { res.json(await Member.findByIdAndUpdate(req.params.id, req.body, {new: true})); });
router.delete('/members/:id', async (req, res) => { await Member.findByIdAndDelete(req.params.id); res.json("Member Deleted"); });

// --- COLLABORATOR CRUD ---
router.post('/collaborators', async (req, res) => {
    try { const c = new Collaborator(req.body); await c.save(); res.status(201).json(c); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
router.get('/collaborators', async (req, res) => { res.json(await Collaborator.find()); });
router.delete('/collaborators/:id', async (req, res) => { await Collaborator.findByIdAndDelete(req.params.id); res.json("Collaborator Deleted"); });

// --- ATTENDANCE ---
router.post('/attendance', async (req, res) => {
    try { const a = new Attendance(req.body); await a.save(); res.status(201).json(a); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});

// --- ANNOUNCEMENT CRUD ---
router.post('/announcements', async (req, res) => {
    try { const ann = new Announcement(req.body); await ann.save(); res.status(201).json(ann); } 
    catch (e) { res.status(400).json({ error: e.message }); }
});
router.get('/announcements', async (req, res) => { res.json(await Announcement.find().sort({date: -1})); });
router.delete('/announcements/:id', async (req, res) => { await Announcement.findByIdAndDelete(req.params.id); res.json("Announcement Deleted"); });

module.exports = router;
