const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Attendance = require('../models/Attendance');
const Collaborator = require('../models/Collaborator');
const Announcement = require('../models/Announcement');

router.get('/dashboard', async (req, res) => {
  try {
    // 1. KOSORA ITARIKI: Gukoresha format ihuye neza n'iyo Admin yohereje (DD/MM/YYYY)
    // Ibi bituma 07/03/2024 itandukana na 7/3/2024, zikaba imwe.
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateToday = new Date().toLocaleDateString('fr-FR', options); 
    
    // 2. Gufata amakuru yose icyarimwe
    const [totalMembers, totalCollabs, attendance, announcements] = await Promise.all([
      Member.countDocuments(),
      Collaborator.countDocuments(),
      // Shaka raporo y'uyu munsi (findOne ikoresheje itariki ya Admin)
      Attendance.findOne({ date: dateToday }),
      // ANNOUNCEMENTS: .sort({ createdAt: -1 }) bituma iheruka (latest) ihuza n'iya mbere
      Announcement.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // 3. SUBIZA AMAKURU
    res.json({
      totalMembers,
      totalCollabs,
      // Niba attendance itaraboneka uyu munsi, isubiza 0
      present: attendance ? (attendance.presentCount || 0) : 0,
      absent: attendance ? (attendance.absentCount || 0) : 0,
      announcements, // Aya aza akurikirana kuva ku rishya cyane
      date: dateToday
    });
  } catch (err) { 
    res.status(500).json({ message: 'Server Error: ' + err.message }); 
  }
});

module.exports = router;
