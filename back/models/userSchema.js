const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  pathMissing,
  badEmailOrPass
} = require('../utils/constants');


const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
  }
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function ({email, password}) {
  if (!email) {
    return new BadRequestError(`${pathMissing} 'email'.`);
  } if (!password) {
    return new BadRequestError(`${pathMissing} 'password'.`);
  }
  return this.findOne({ email: 'hellonm4@mail.ru' }).select('+password')
  .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(badEmailOrPass));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(badEmailOrPass));
          }
          return user;
        });
    });
};

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.toJSON = toJSON;

module.exports = mongoose.model('user', userSchema);