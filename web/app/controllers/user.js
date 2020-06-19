
const xss = require('xss');
const mongoose = require('mongoose');
const uuid = require('uuid');
const userHelper = require('../dbhelper/userHelper');
const sendEmail = require('../service/email');
const User = mongoose.model('User');


exports.getUser = function* () {
  const { email } = this.request.query;
  const data = yield User.findOne({ email }).exec();
  this.body = {
    success: true,
    data
  };
}


exports.signup = function* () {
  const ctx = this
  const { email, password } = ctx.request.body

  let user = yield User.findOne({
    email,
    password
  }).exec();

  const verifyCode = Math.floor((Math.random() * 10000) + 1);
  if (!user) {
    // var accessToken = uuid.v4()
    ctx.body = {
      success: false,
      code: 404
    };
    return;
  }
  user.accessToken = uuid.v4();
  user.verifyCode = verifyCode;
  try {

    user = yield user.save();

    ctx.body = {
      success: true,
      code: 200,
      result: user
    };
  } catch (e) {

    ctx.body = {
      success: false,
      code: 500
    };
    return;
  }
}

exports.updatePassword = function* () {
  const ctx = this
  const { email, password } = ctx.request.body;
  try {
    const user = yield userHelper.updatePassword({ email, password });
    ctx.body = {
      success: true,
      code: 200,
      result: user
    };
  } catch (e) {
    ctx.body = {
      success: false,
      code: 500
    };
    return;
  }
}

exports.sendVerifyEmail = function* () {
  const ctx = this
  const mailBody = ctx.request.body;
  const res = yield sendEmail.sendMail(mailBody);
  ctx.body = {
    success: true,
    code: res
  };
}

exports.addUser = function* () {
  const ctx = this
  const request = ctx.request.body;
  const user = new User({
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    password: request.password,
    phoneNumber: xss('13800138000'),
    verifyCode: request.verCode,
    accessToken: uuid.v4()
  });
  const user2 = yield userHelper.addUser(user);
  if (user2) {
    ctx.body = {
      success: true,
      data: user2
    };
  }
}
