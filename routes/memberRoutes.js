const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.get('/', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

router.post('/', async (req, res) => {
  const newMember = new Member(req.body);
  const saved = await newMember.save();
  res.json(saved);
});

router.put('/:id', async (req, res) => {
  const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Member deleted' });
});

module.exports = router;
