const express = require('express');
const router = express.Router();
const Collaborator = require('../models/Collaborator');

// 1. Reba abafatanyabikorwa bose (Iheruka imbere)
router.get('/', async (req, res) => {
  try {
    const collaborators = await Collaborator.find().sort({ createdAt: -1 });
    res.json(collaborators);
  } catch (err) {
    res.status(500).json({ message: "Ikosa mu gufata lisiti: " + err.message });
  }
});

// 2. Ongera umufatanyabikorwa mushya
router.post('/', async (req, res) => {
  const { name, role, phone, email } = req.body;
  
  // Guceka niba amakuru y'ingenzi ahari
  if (!name || !phone) {
    return res.status(400).json({ message: "Izina na Telefone ni ngombwa!" });
  }

  const collaborator = new Collaborator({ name, role, phone, email });

  try {
    const newCollaborator = await collaborator.save();
    res.status(201).json(newCollaborator);
  } catch (err) {
    res.status(400).json({ message: "Ntibyabashije kubikwa: " + err.message });
  }
});

// 3. Hindura amakuru (Update)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Collaborator.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // runValidators ituma amategeko ya Model akurikizwa na mu guhindura
    );
    if (!updated) return res.status(404).json({ message: "Uwo mufatanyabikorwa ntabonetse" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Guvugurura byanze: " + err.message });
  }
});

// 4. Siba (Delete)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Collaborator.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Uwo mufatanyabikorwa ntabonetse" });
    res.json({ message: 'Basibwe neza' });
  } catch (err) {
    res.status(500).json({ message: "Gusiba byanze: " + err.message });
  }
});

module.exports = router;
