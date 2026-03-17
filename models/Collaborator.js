const mongoose = require('mongoose');

const CollaboratorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Izina ni ngombwa"] 
  },
  role: { 
    type: String, 
    required: [true, "Inshingano ni ngombwa"] 
  },
  phone: { 
    type: String, 
    unique: true, // Kwirinda duplications
    required: true 
  },
  email: { 
    type: String, 
    lowercase: true, // Kugira ngo email zose zibe mu nyuguti nto
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
