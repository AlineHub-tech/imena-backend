const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// 1. Tangiza Express App
const app = express();

// 2. Huza na MongoDB Atlas Database
connectDB();

// 3. Middlewares & CORS Configuration
// Isoma FRONTEND_URL twashyize muri Render Environment (https://imena-moves-kidz.vercel.app)
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: function (origin, callback) {
    // Emerera request zidafite origin (nka mobile apps/postman) cyangwa iziturutse kuri Vercel
    if (!origin || origin === allowedOrigin || origin === 'http://localhost:5173') {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy: Iyi mbuga ntiyemerewe kuvugana na API'));
    }
  },
  credentials: true
}));

app.use(express.json()); // Gatuma server yakira amakuru muri JSON format

// 4. Inzira za API (Routes)
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/collaborators', require('./routes/collaboratorRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// 5. Root Route (Kugira ngo umenye ko server ikora neza kuri Render)
app.get('/', (req, res) => {
  res.json({
    message: 'Imena Moves Kidz API is running successfully!',
    status: 'Connected',
    frontend_allowed: allowedOrigin
  });
});

// 6. Gufungura Port ya Server
// Render itanga Port yayo mu buryo bwa automatic binyuze kuri process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`-------------------------------------------`);
  console.log(`🚀 Imena Backend is LIVE`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌍 URL: https://imena-backend.onrender.com`);
  console.log(`👉 Allowed Frontend: ${allowedOrigin}`);
  console.log(`-------------------------------------------`);
});
