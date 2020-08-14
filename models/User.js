const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  userPassword: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Users', userSchema);