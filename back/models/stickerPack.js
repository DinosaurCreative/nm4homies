const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
  pathMissing,
  badEmailOrPass
} = require('../utils/constants');

const stickerSchema = new  mongoose.Schema({
  size: {
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
});

const stickerPackSchema = new mongoose.Schema({
  setTitle: mongoose.Schema.Types.Mixed,
  description: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  stickersArray: [stickerSchema],
}, { versionKey: false });

module.exports = mongoose.model('stickerPack', stickerPackSchema);

