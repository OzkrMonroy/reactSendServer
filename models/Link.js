const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileOriginalName: {
    type: String,
    required: true
  },
  fileDownloadsCount: {
    type: Number,
    default: 1
  },
  fileCreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    default: null
  },
  filePassword: {
    type: String,
    default: null
  },
  fileCreatedAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Links', linkSchema);