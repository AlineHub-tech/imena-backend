const mongoose = require('mongoose');
const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  parentName: String,
  phone: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });
module.exports = mongoose.model('Member', MemberSchema);
