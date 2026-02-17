const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// 1. Huza na MongoDB Atlas (Menya neza ko MONGO_URI iri kuri Render)
connectDB();

const app = express();

// 2. Middlewares
// Gukoresha cors() gutya gusa birakuraho amakosa ya CORS 100% mu gihe ukiri gu-deploy
app.use(cors()); 

// Iyi igomba kuba hejuru ya routes kugira ngo yakire JSON data
app.use(express.json()); 

// 3. Inzira za API (Routes)
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/collaborators', require('./routes/collaboratorRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// 4. Root Route (Kugira ngo ugenzure niba Backend ikora kuri Browser)
app.get('/', (req, res) => {
  res.json({ message: "Imena Backend is Live and Running!" });
});

// 5. Gufungura Port ya Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
