const express = require('express');
const router = express.Router();
const Collaborator = require('../models/Collaborator');

// Reba abafatanyabikorwa bose
router.get('/', async (req, res) => {
  try {
    const collaborators = await Collaborator.find().sort({ createdAt: -1 });
    res.json(collaborators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ongera umufatanyabikorwa mushya
router.post('/', async (req, res) => {
  const collaborator = new Collaborator({
    name: req.body.name,
    role: req.body.role,
    phone: req.body.phone,
    email: req.body.email
  });

  try {
    const newCollaborator = await collaborator.save();
    res.status(201).json(newCollaborator);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Hindura amakuru y'umufatanyabikorwa
router.put('/:id', async (req, res) => {
  try {
    const updated = await Collaborator.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Siba umufatanyabikorwa
router.delete('/:id', async (req, res) => {
  try {
    await Collaborator.findByIdAndDelete(req.params.id);
    res.json({ message: 'Collaborator deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
