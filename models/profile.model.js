const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true,
    min: 18
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  preferredPartner: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  hobbies: [{ type: String }],
  radius: {
    type: Number,
    default: null 
  }
}, {
  timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
