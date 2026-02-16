const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Import Models
const Member = require('./models/Member');
const Collaborator = require('./models/Collaborator');
const Announcement = require('./models/Announcement');
const Attendance = require('./models/Attendance');

const app = express();

// 2. CORS IKOSOYE (Yemerera Vercel na Local zose)
const allowedOrigins = [
    "https://imena-moves-kidz.vercel.app", 
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Byanzwe na CORS policy'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.log("❌ Connection Error:", err));

// 3. Routes (Reba ko amazina ya files muri folder ya routes ahuye neza n'aya)
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/collaborators', require('./routes/collaboratorRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));

// 4. Stats Route
app.get('/api/dashboard-stats', async (req, res) => {
    try {
        const memberCount = await Member.countDocuments();
        const collabCount = await Collaborator.countDocuments();
        
        // Itariki ikosoye (YYYY-MM-DD)
        const today = new Date().toISOString().split('T')[0];
        const attendance = await Attendance.findOne({ date: today });
        
        const present = attendance ? attendance.records.filter(r => r.status === 'Present').length : 0;
        const absent = attendance ? attendance.records.filter(r => r.status === 'Absent').length : 0;

        res.json({
            totalMembers: memberCount,
            totalCollaborators: collabCount,
            presentToday: present,
            absentToday: absent,
            lastUpdated: new Date().toLocaleString('rw-RW')
        });
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
