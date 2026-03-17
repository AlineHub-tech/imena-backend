const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Member = require('../models/Member');
const Collaborator = require('../models/Collaborator');

// 1. GET ALL HISTORY (Kugira ngo igaragare kuri History Page yose)
router.get('/', async (req, res) => {
  try {
    const history = await Attendance.find().sort({ createdAt: -1 }); // Iheruka imbere
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. BIKA CYANGWA VUGURURA ATTENDANCE & HISTORY
router.post('/', async (req, res) => {
  const { date, time, presentList, absentList, presentCount, absentCount } = req.body;

  try {
    // a. Gushaka abanyamuryango bashya binjiye uyu munsi (Created Today)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const newMembersData = await Member.find({ createdAt: { $gte: startOfDay } });
    const newCollabsData = await Collaborator.find({ createdAt: { $gte: startOfDay } });

    const newMembersNames = newMembersData.map(m => m.name);
    const newCollabsNames = newCollabsData.map(c => c.name);

    // b. Bika muri Database (Update niba iyo tariki isanzwe ihari, cyangwa Create nshya)
    const filter = { date: date };
    const update = {
      time,
      presentCount,
      absentCount,
      presentList,
      absentList,
      newMembers: newMembersNames,
      newCollaborators: newCollabsNames
    };

    const attendance = await Attendance.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true // Bikora nshya niba idahari
    });

    res.status(201).json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Habaye ikosa mu kubika raporo" });
  }
});

module.exports = router;
