const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// 1. POST: Kubika cyangwa Kuvugurura Attendance
router.post('/', async (req, res) => {
    const { date, records } = req.body; 

    if (!date || !records || records.length === 0) {
        return res.status(400).json({ message: "Itariki n'urutonde rw'abanyamuryango birakenewe!" });
    }

    try {
        // Gukoresha findOneAndUpdate bituma niba itariki isanzwe ihari ihita ivugururwa (Upsert)
        const attendance = await Attendance.findOneAndUpdate(
            { date: date }, 
            { records: records }, 
            { upsert: true, new: true }
        );
        res.status(201).json(attendance);
    } catch (err) {
        res.status(400).json({ message: "Gubika attendance byanze: " + err.message });
    }
});

// 2. GET: Gusoma attendance y'umunsi runaka
router.get('/:date', async (req, res) => {
    try {
        const data = await Attendance.findOne({ date: req.params.date })
            .populate('records.memberId', 'name role'); // Ibi bituma ubona izina ry'umuntu aho kubona ID gusa
        
        if (!data) return res.status(404).json({ message: "Nta attendance yabonetse kuri iyi tariki." });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
