const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  status: { type: String, enum: ['present', 'absent'], required: true },
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Attendance', AttendanceSchema);
