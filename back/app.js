const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const app = express();
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const stickerRouter = require('./routes/stickerRouter');
const NotFoundError = require('./errors/NotFoundError');
const { dataBaseAdress, PORT } = require('./utils/config');
const { connected, notConnected, wrongPath } = require('./utils/constants');
const auth = require('./middlewares/auth');
app.use(cors);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dataBaseAdress, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log(connected))
  .catch(() => console.log(notConnected));

app.use('/', stickerRouter);

app.use('*', auth, () => {
  throw new NotFoundError(wrongPath);
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Подключено к порту ${PORT}.`);
});
