const mongoose = require('mongoose');

const CollaboratorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // Ex: Coach, Volunteer, etc.
  phone: { type: String },
  email: { type: String },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
