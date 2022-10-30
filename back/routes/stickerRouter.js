const stickerRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  deleteStickerPack,
  createStickerPack,
  getStickerPacks, 
  patchStickerPack,
  getStickerPack,
  login,
  signOut
} = require('../controllers/stickerPack');

const { 
  getStickerPackValidation,
  deleteStickerPackValidation,
  createStickerPackValidation,
  getStickerPacksValidation,
  patchStickerPackValidation,
  loginValidation,
 } = require('../middlewares/validators');

stickerRouter.delete('/sticker-pack/:id?', auth, deleteStickerPackValidation, deleteStickerPack);
stickerRouter.post('/sticker-pack', auth, createStickerPackValidation, createStickerPack);
stickerRouter.get('/sticker-packs', auth, getStickerPacksValidation, getStickerPacks);
stickerRouter.get('/sticker-pack/:id?', auth, getStickerPackValidation, getStickerPack);
stickerRouter.patch('/sticker-pack/:id?', auth, patchStickerPackValidation, patchStickerPack);

stickerRouter.post('/signin', loginValidation, login);
stickerRouter.delete('/signout', auth, signOut);



module.exports = stickerRouter;
