const mongoose = require('mongoose');

const User = mongoose.model('User');

/**
 * find by phone
 * @param  {[type]} options.email [description]
 * @return {[type]}                     [description]
 */
exports.findByEmail = async ({ email }) => {
  const query = User.find({ email });
  let res = null;
  await query.exec((err, user) => {
    if (err) {
      res = {};
    } else {
      res = user;
    }
  });
  // console.log('res====>' + res)
  return res;
};

/**
 * find all users
 * @return {[type]} [description]
 */
exports.findAllUsers = async () => {
  const query = User.find({});
  let res = [];
  await query.exec((err, users) => {
    if (err) {
      res = [];
    } else {
      res = users;
    }
  });
  return res;
};

/**
 * add user
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
exports.addUser = async (user) => {
  user = await user.save();
  return user;
};

/**
 * update password
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
exports.updatePassword = async (user) => {
  const userInfo = await User.findOne({ email: user.email }).exec();
  userInfo.password = user.password;
  await User.update(userInfo).exec();
  return userInfo;
};

/**
 * delete user
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.deleteUser = async ({ phoneNumber }) => {
  let flag = false;
  await User.remove({ phoneNumber }, (err) => {
    if (err) {
      flag = false;
      // return false
    } else {
      flag = true;
    }
  });
  return flag;
};
