const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  records: [{
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    status: { type: String, enum: ['present', 'absent'], required: true }
  }]
});
module.exports = mongoose.model('Attendance', AttendanceSchema);
