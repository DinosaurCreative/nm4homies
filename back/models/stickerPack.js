const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
  pathMissing,
  badEmailOrPass
} = require('../utils/constants');

const stickerPackSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  discprition: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

stickerPackSchema.statics.findUserByCredentials = function ({email, password}) {
  if (!email) {
    return new BadRequestError(`${pathMissing} "email".`);
  } if (!password) {
    return new BadRequestError(`${pathMissing} "password".`);
  }
  return this.findOne({ email }).select('+password')
    .then((user) => {
      console.log(user)
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
}

stickerPackSchema.methods.toJSON = toJSON;

module.exports = mongoose.model('stickerPack', stickerPackSchema);
