const mongoose = require('mongoose');
const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  joinedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Member', MemberSchema);
