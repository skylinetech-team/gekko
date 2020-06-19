/* eslint-disable no-multi-assign */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * define model
 * mongoDB collection=>model，
 * field type.
 * index and others
 * @type {mongoose}
 */
const UserSchema = new Schema({
  phoneNumber: String,
  email: {
    unique: true,
    type: String
  },
  verifyCode: String,
  verified: {
    type: Boolean,
    default: false
  },
  accessToken: String,
  firstName: String,
  lastName: String,
  password: String,
  breed: String,
  avatar: String,
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
});

// Defines a pre hook for the document.
UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});


/**
 * User model
 * use mongoose.model Schema to Model
 * @type {[type]}
 */
// if not have add new
const User = mongoose.model('User', UserSchema);

module.exports = User;

