// เรียกใช้งาน mongoose
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//สร้าง Schema
var UserSchema = new Schema({
  user_id: String,
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  first_name: String,
  last_name: String,
  email: {
    type: String,
    index: true
  },
  password: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

// สร้่าง model
mongoose.model('User',UserSchema);
