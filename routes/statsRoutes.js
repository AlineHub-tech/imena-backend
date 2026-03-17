const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Attendance = require('../models/Attendance');
const Collaborator = require('../models/Collaborator');
const Announcement = require('../models/Announcement');

router.get('/dashboard', async (req, res) => {
  try {
    // 1. Itariki y'uyu munsi ihuye n'iyo Admin Dashboard yohereje
    const dateToday = new Date().toISOString().split('T')[0];
    
    // 2. Gufata amakuru yose icyarimwe (Parallel) bituma system yihuta
    const [totalMembers, totalCollabs, attendance, announcements] = await Promise.all([
      Member.countDocuments(),
      Collaborator.countDocuments(),
      Attendance.findOne({ date: dateToday }),
      Announcement.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      totalMembers,
      totalCollabs,
      // Hano ntabwo tugikora .filter() kuko twabitswe presentCount muri Database
      present: attendance ? (attendance.presentCount || 0) : 0,
      absent: attendance ? (attendance.absentCount || 0) : 0,
      announcements,
      date: dateToday
    });
  } catch (err) { 
    res.status(500).json({ message: 'Server Error: ' + err.message }); 
  }
});

module.exports = router;
