// เรียกใช้งาน mongoose
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var crypto = require('crypto');

//สร้าง Schema
var UserSchema = new Schema({
  user_id: String,
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true,
  },
  first_name: String,
  last_name: String,
  email: {
    type: String,
    index: true
  },
  password: {
    type: String,
    required: 'Password is required',
    validate:[
        function(password){
          return password && password.length >= 6;
        },
        'Password must be at least 6 characters'
    ]
  },
  salt:{
    type: String,
  },

  provider:{
    type: String,
    required: 'Provider is required'
  },

  providerId: String,

  providerData: {},

  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// ก่อน save
UserSchema.pre('save', function(next){

  if(this.password){
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
    this.password = this.hashPassword(this.password);
  }

  now = Date.now;
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }

  next();
});

// เข้ารหัส
UserSchema.methods.hashPassword = function(password){
  return crypto.pbkdf2Sync(password,this.salt,10000,64).toString('base64');
};

//เชค
UserSchema.methods.authenticate = function(password){
  return this.password === this.hashPassword(password);
};

// สร้่าง model
mongoose.model('User',UserSchema);
