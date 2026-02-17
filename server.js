const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. CORS Configuration (Ingenzi kugira ngo Vercel ivugane na Render)
app.use(cors({
    origin: ["https://imena-moves-kidz.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// 2. MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 3. Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));

// 4. Test Route
app.get('/', (req, res) => res.send("Imena API is Running Live..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
