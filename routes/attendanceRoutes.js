const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Bika attendance y'umunsi
router.post('/', async (req, res) => {
  const { date, records } = req.body;
  try {
    let attendance = await Attendance.findOne({ date });
    if (attendance) {
      attendance.records = records;
      await attendance.save();
    } else {
      attendance = new Attendance({ date, records });
      await attendance.save();
    }
    res.json(attendance);
  } catch (err) { res.status(500).send(err.message); }
});

router.get('/:date', async (req, res) => {
  const attendance = await Attendance.findOne({ date: req.params.date }).populate('records.memberId');
  res.json(attendance);
});

module.exports = router;
