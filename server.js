const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// 1. Tangiza Express App
const app = express();

// 2. Huza na MongoDB Atlas Database
connectDB();

// 3. Middlewares (Vugurura hano kuri CORS)
const allowedOrigins = [
  'https://imena-moves-kidz.vercel.app', // URL ya Vercel yawe
  'http://localhost:5173',               // Niba ukoresha Vite kuri mudasobwa
  'http://localhost:3000'                // Niba ukoresha Create React App
];

app.use(cors({
  origin: function (origin, callback) {
    // Emerera requests zidafite origin (nka Postman) cyangwa iziri muri allowedOrigins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
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

// 5. Root Route
app.get('/', (req, res) => {
  res.send('Imena Moves Kidz API is running successfully on Render...');
});

// 6. Gufungura Port ya Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`-------------------------------------------`);
  console.log(`🚀 Imena Backend running on port ${PORT}`);
  console.log(`📂 API Base URL: https://imena-backend.onrender.com`);
  console.log(`-------------------------------------------`);
});
