const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// 1. Reba abanyamuryango bose (Abiyandikishije vuba babe hejuru)
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Habaye ikosa mu gufata lisiti" });
  }
});

// 2. Ongera umunyamuryango mushya
router.post('/', async (req, res) => {
  const { name, phone, age, parentName } = req.body;
  
  // Guceka niba amakuru y'ingenzi ahari
  if (!name || !phone) {
    return res.status(400).json({ message: "Izina na Telefone ni ngombwa!" });
  }

  try {
    const newMember = new Member({ name, phone, age, parentName });
    const saved = await newMember.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Kubika byanze: " + err.message });
  }
});

// 3. Hindura amakuru (Update)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Umunyamuryango ntabonetse" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Guhindura byanze: " + err.message });
  }
});

// 4. Siba (Delete)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Umunyamuryango ntabonetse" });
    res.json({ msg: 'Umunyamuryango yasibwe neza' });
  } catch (err) {
    res.status(500).json({ message: "Gusiba byanze" });
  }
});

module.exports = router;
