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
  description: {
    type: String,
  },
}, { versionKey: false });

module.exports = mongoose.model('stickerPack', stickerPackSchema);

