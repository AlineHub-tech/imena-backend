const mongoose = require('mongoose');
const CollaboratorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g. Choreographer, Sponsor
    email: String
}, { timestamps: true });
module.exports = mongoose.model('Collaborator', CollaboratorSchema);
