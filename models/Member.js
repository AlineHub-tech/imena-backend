const mongoose = require('mongoose');
const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, default: 'Active' }
}, { timestamps: true });
module.exports = mongoose.model('Member', MemberSchema);
