const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.log("❌ Connection Error:", err));

// Routes
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/collaborators', require('./routes/collaboratorRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));

// Stats Route (Iyo Member Dashboard ikoresha)
app.get('/api/dashboard-stats', async (req, res) => {
    try {
        const memberCount = await require('./models/Member').countDocuments();
        const collabCount = await require('./models/Collaborator').countDocuments();
        const today = new Date().toISOString().split('T')[0];
        const attendance = await require('./models/Attendance').findOne({ date: today });
        
        const present = attendance ? attendance.records.filter(r => r.status === 'Present').length : 0;
        const absent = attendance ? attendance.records.filter(r => r.status === 'Absent').length : 0;

        res.json({
            totalMembers: memberCount,
            totalCollaborators: collabCount,
            presentToday: present,
            absentToday: absent,
            lastUpdated: new Date().toLocaleString()
        });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
