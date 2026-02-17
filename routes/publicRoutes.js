const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Collaborator = require('../models/Collaborator');
const Attendance = require('../models/Attendance');
const Announcement = require('../models/Announcement');

// Iyi niyo route MemberDashboard ihamagara
router.get('/dashboard-stats', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [mCount, cCount, present, absent, news] = await Promise.all([
            Member.countDocuments(),
            Collaborator.countDocuments(),
            Attendance.countDocuments({ date: { $gte: today }, status: 'Present' }),
            Attendance.countDocuments({ date: { $gte: today }, status: 'Absent' }),
            Announcement.find().sort({ date: -1 }).limit(5)
        ]);

        res.json({
            stats: { totalMembers: mCount, totalCollabs: cCount, presentToday: present, absentToday: absent },
            announcements: news,
            serverDate: new Date()
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
