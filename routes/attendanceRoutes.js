const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// 1. Kubika attendance y'umunsi (Submit/Update)
router.post('/', async (req, res) => {
    const { date, records } = req.body; // records ni array ifite [{memberId, status}]
    try {
        // Niba attendance y'uwo munsi isanzwe ihari, irayisimbura (Update), niba idahari ikayishyingura (Create)
        const attendance = await Attendance.findOneAndUpdate(
            { date: date }, 
            { records: records }, 
            { upsert: true, new: true }
        );
        res.status(201).json(attendance);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 2. Gusoma attendance y'itariki runaka (e.g. 2024-05-20)
router.get('/:date', async (req, res) => {
    try {
        const data = await Attendance.findOne({ date: req.params.date })
            .populate('records.memberId', 'name role'); // Iduha n'izina ry'umunyamuryango
        if (!data) return res.status(404).json({ message: "No records for this date" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Gusoma amakuru yose ya attendance (Dashboard stats)
router.get('/', async (req, res) => {
    try {
        const allAttendance = await Attendance.find();
        res.json(allAttendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
