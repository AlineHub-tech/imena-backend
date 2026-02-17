const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Collaborator = require('../models/Collaborator');
const Attendance = require('../models/Attendance');
const Announcement = require('../models/Announcement');

router.get('/dashboard-stats', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalMembers = await Member.countDocuments();
        const totalCollabs = await Collaborator.countDocuments();
        const presentToday = await Attendance.countDocuments({ date: { $gte: today }, status: 'present' });
        const absentToday = await Attendance.countDocuments({ date: { $gte: today }, status: 'absent' });
        
        // Itangazo rya nyuma ryasohotse uyu munsi
        const todayAnnouncement = await Announcement.findOne({ date: { $gte: today } }).sort({ date: -1 });

        res.json({
            totalMembers,
            totalCollabs,
            presentToday,
            absentToday,
            announcement: todayAnnouncement ? todayAnnouncement.content : "Nta tangazo ryamamajwe uyu munsi",
            date: new Date().toDateString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
