const mongoose = require('mongoose');
const CollaboratorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  phone: String,
  email: String
}, { timestamps: true });
module.exports = mongoose.model('Collaborator', CollaboratorSchema);
