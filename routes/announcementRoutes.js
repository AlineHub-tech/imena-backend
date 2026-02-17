const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// 1. GET ALL: Reba amatangazo yose
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Ntibishoboye kuboneka: " + err.message });
  }
});

// 2. CREATE: Shyira hanze itangazo rishya
router.post('/', async (req, res) => {
  // Turebe niba data yaje
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: "Umutwe n'ibirimo birakenewe!" });
  }

  const announcement = new Announcement({
    title: req.body.title,
    content: req.body.content,
    date: new Date() // Menya neza ko ufite date mu model
  });

  try {
    const newAnnouncement = await announcement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(400).json({ message: "Kubika byanze: " + err.message });
  }
});

// 3. UPDATE: Hindura itangazo
// Iyi ni yo yateraga 404 niba itari iriho cyangwa idahura neza na URL
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id, 
      { title, content }, 
      { new: true, runValidators: true } // runValidators ituma niba hari amategeko muri Model akurikizwa
    );

    if (!updated) {
      return res.status(404).json({ message: "Itangazo ry'iyo ID ntiribonetse muri database." });
    }
    
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Guhindura byanze: " + err.message });
  }
});

// 4. DELETE: Siba itangazo
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Nta tangazo ryabonetse ryo gusibwa." });
    }
    res.json({ message: 'Itangazo ryasibwe neza!' });
  } catch (err) {
    res.status(500).json({ message: "Gusiba byanze: " + err.message });
  }
});

module.exports = router;
