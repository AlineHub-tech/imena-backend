const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Izina ry'umunyamuryango ni ngombwa"],
    trim: true 
  },
  age: { 
    type: Number, 
    min: [0, "Imyaka ntiyajya munsi ya zeru"] 
  },
  parentName: { 
    type: String, 
    required: [true, "Izina ry'umubyeyi ni ngombwa"] 
  },
  phone: { 
    type: String, 
    required: [true, "Telefone ni ngombwa"],
    unique: true // Bituma umuntu umwe atiyandikisha kabiri
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
  }
}, { timestamps: true }); // Iyi 'timestamps' ni ingenzi cyane kuri History Page

module.exports = mongoose.model('Member', MemberSchema);
