const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Ex: "17/03/2024"
  time: { type: String },                 // Isaha raporo yakoreweho
  presentCount: { type: Number, default: 0 },
  absentCount: { type: Number, default: 0 },
  
  // Urutonde rw'amazina kugira ngo bitazagusaba "Populate" ihoraho
  presentList: [{ type: String }], 
  absentList: [{ type: String }],
  
  // Amakuru y'abashya (New members/collabs) niba ushaka kuyabika uwo munsi
  newMembers: [{ type: String }],
  newCollaborators: [{ type: String }],

  // Kugira ngo ukomeze ube ufite na IDs niba uzazikenera mu bindi
  records: [{
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    status: { type: String, enum: ['present', 'absent'] }
  }]
}, { timestamps: true }); // Bituma umenya igihe nyacyo buri row yakorewe

module.exports = mongoose.model('Attendance', AttendanceSchema);
