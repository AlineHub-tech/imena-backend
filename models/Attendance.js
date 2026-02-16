const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    records: [{
        memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
        status: { type: String, enum: ['Present', 'Absent'], required: true }
    }]
}, { timestamps: true });
module.exports = mongoose.model('Attendance', AttendanceSchema);
