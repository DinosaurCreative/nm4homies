const { celebrate, Joi } = require('celebrate');

const loginValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
  }),
});

const getStickerPacksValidation = celebrate({
  body: Joi.object,
});

const getStickerPackValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

const deleteStickerPackValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

const createStickerPackValidation = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    color: Joi.string().required(),
    date: Joi.string().required(),
    size: Joi.string().required(),
    quantity: Joi.number().required(),
    description: Joi.any(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const patchStickerPackValidation = celebrate({
  body: Joi.object().keys({
    title: Joi.string(),
    color: Joi.string(),
    date: Joi.string(),
    size: Joi.string(),
    quantity: Joi.number(),
    discription: Joi.string(),
  }),
});

module.exports = {
  loginValidation,
  getStickerPackValidation,
  getStickerPacksValidation,
  deleteStickerPackValidation,
  createStickerPackValidation,
  patchStickerPackValidation,
  loginValidation,
  createUserValidation
};
