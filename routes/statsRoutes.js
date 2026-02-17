const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Attendance = require('../models/Attendance');
const Collaborator = require('../models/Collaborator');
const Announcement = require('../models/Announcement');

router.get('/dashboard', async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const totalCollabs = await Collaborator.countDocuments();
    const dateToday = new Date().toISOString().split('T')[0];
    
    const attendance = await Attendance.findOne({ date: dateToday });
    const announcements = await Announcement.find().sort({ date: -1 }).limit(5);

    res.json({
      totalMembers,
      totalCollabs,
      present: attendance ? attendance.records.filter(r => r.status === 'present').length : 0,
      absent: attendance ? attendance.records.filter(r => r.status === 'absent').length : 0,
      announcements,
      date: dateToday
    });
  } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;
