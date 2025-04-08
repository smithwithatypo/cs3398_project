// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  password: { 
    type: String, 
    required: true 
  },
  profilePicture: {
    type: String, // URL or path to profile picture
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', userSchema);
export default User;
