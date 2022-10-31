const StickerPack = require('../models/stickerPack');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const jwt = require('jsonwebtoken');
const {
  stickerPackMissing,
  pathMissing,
  badValue,
  email,
  usersIdMissing
} = require('../utils/constants');
const { devSecretKey } = require('../utils/config');

module.exports.getStickerPacks = (req, res, next) => {
  StickerPack.find({})
    .then(sticker => res.send({ data: sticker }))
    .catch(next);
};

module.exports.getSticker = (req, res, next) => {
  StickerPack.find({})
    .then(sticker => res.send({ data: sticker }))
    .catch(next);
};

module.exports.createStickerPack = (req, res, next) => {
  const {
    color,
    quantity,
    size,
    title,
    date,
    discription,
  } = req.body;
  
  StickerPack.create({
    color,
    quantity,
    size,
    title,
    date,
    discription,
  })
    .then(stickerPack => res.send({ data: stickerPack }))
    .catch(err => {
      const pathName = err.message.split('`')[1];
      if (err.message.includes('is required')) {
        return next(new BadRequestError(`${pathMissing} '${pathName}'.`));
      } if (err.message.includes(`Validator failed for path \`${pathName}\``)) {
        return next(new BadRequestError(`${err.errors[pathName].reason} в поле '${pathName}'.`));
      }
      return next(err);
    });
};

module.exports.getStickerPack = (req, res, next) => {
  StickerPack.findById(req.query.id)
    .orFail(new NotFoundError(stickerPackMissing))
    .then(sticker => res.send({ data: sticker }))
    .catch(next);
};

module.exports.deleteStickerPack = (req, res, next) => {
  StickerPack.findById(req.query.id) 
    .orFail(new NotFoundError(stickerPackMissing))
    .then(res => {
      StickerPack.findByIdAndRemove(req.query.id)
        .then(() => res.send({ message: `Файл удален!` }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(badValue));
      }
      return next(err);
    });
};

module.exports.patchStickerPack = (req, res, next) => {
  StickerPack.findByIdAndUpdate(req.query.id, req.body)
  .orFail(new NotFoundError(stickerPackMissing))
    .then(() => res.send({ message: `Изменения добавлены!` }))
    .catch(next);
}


module.exports.login = (req, res, next) => {
  const { password } = req.body;

  User.findUserByCredentials({ password, email })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, devSecretKey, { expiresIn: '7d' });
      res.cookie('_id', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      }).send(user);
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  if (!password) {
    throw next(new BadRequestError(`${pathMissing} 'password'.`));
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, password: hash,
      })
        .then((user) => res.send(user))
        .catch((err) => {
          if (err.message.includes('is required')) {
            const pathName = err.message.split('`')[1];
            return next(new BadRequestError(`${pathMissing} '${pathName}'.`));
          } if (err.code === 11000 || err.name === 'MongoError') {
            return next(new ConflictError('emailTaken'));
          }
          return next(err);
        });
    }).catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {

  User.findById(req.user)
    .orFail(new NotFoundError(usersIdMissing))
    .then((user) => res.send(user))
    .catch((err) => {
      console.log('first')
      if (err.name === 'CastError') {
        next(new BadRequestError(badValue));
        return;
      }
      next(err);
    });
};


module.exports.signOut = (req, res, next) => {
  res.clearCookie('_id', {
    sameSite: 'None',
    secure: true,
  }).send({ message: 'Куки удалены' });
  // next();
};