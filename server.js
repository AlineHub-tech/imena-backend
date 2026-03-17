const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// 1. Middlewares
app.use(cors()); // Kwemerera Frontend yawe (Vercel) kuvugana na Backend
app.use(express.json()); // Kwakira amakuru ya JSON ava muri Dashboard

// 2. Database Connection (MongoDB Atlas)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully!');
  } catch (err) {
    console.error('❌ Database Connection Error:', err.message);
    process.exit(1);
  }
};
connectDB();

// 3. API Routes (Inzira z'amakuru)
// Menya neza ko amazina ya Files muri folder ya 'routes' ahura n'aya:
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/collaborators', require('./routes/collaboratorRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// 4. Root Route (Kureba niba Backend ikora kuri Browser)
app.get('/', (req, res) => {
  res.json({ 
    status: "Active",
    message: "Imena Moves Backend is Live!",
    version: "1.0.0"
  });
});

// 5. Error Handling (Igihe hari route idahari)
app.use((req, res) => {
  res.status(404).json({ message: "Iyo nzira (Route) ntibonetse!" });
});

// 6. Gufungura Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
