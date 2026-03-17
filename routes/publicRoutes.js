const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Collaborator = require('../models/Collaborator');
const Attendance = require('../models/Attendance');
const Announcement = require('../models/Announcement');

router.get('/dashboard-stats', async (req, res) => {
    try {
        // 1. Gufata itariki y'uyu munsi mu buryo bwa String (nk'uko Admin abibika)
        const todayStr = new Date().toLocaleDateString('fr-FR'); 

        // 2. Gufata amakuru yose icyarimwe (Parallel)
        const [mCount, cCount, todayAttendance, news] = await Promise.all([
            Member.countDocuments({ status: 'active' }), // Abanyamuryango bari active gusa
            Collaborator.countDocuments(),
            Attendance.findOne({ date: todayStr }), // Shaka raporo y'uyu munsi
            Announcement.find().sort({ createdAt: -1 }).limit(5)
        ]);

        res.json({
            stats: { 
                totalMembers: mCount, 
                totalCollabs: cCount, 
                // Niba nta attendance yabitswe uyu munsi, shyira 0
                presentToday: todayAttendance ? todayAttendance.presentCount : 0, 
                absentToday: todayAttendance ? todayAttendance.absentCount : 0 
            },
            announcements: news,
            serverDate: new Date()
        });
    } catch (e) {
        res.status(500).json({ error: "Habaye ikosa mu gushaka stats: " + e.message });
    }
});

module.exports = router;
