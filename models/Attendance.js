const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    // Gukoresha String ku itariki (YYYY-MM-DD) ni byiza kuri Dashboard
    date: { 
        type: String, 
        required: true, 
        unique: true // Ibi bituma umunsi umwe utabikwa kabiri (No duplicates)
    }, 
    records: [{
        memberId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Member', // Reba ko muri Member.js naho ari 'Member' yanditse gutya
            required: true 
        },
        status: { 
            type: String, 
            enum: ['Present', 'Absent'], 
            default: 'Absent' 
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
