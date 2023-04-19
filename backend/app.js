/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { loginValidation, createUserValidation } = require('./middlewares/celebrate-validate');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const cors = require('./middlewares/cors');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
})
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.log(`Error during connection ${error}`);
  });

app.use(bodyParser.json());

app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

const { PORT = 3000 } = process.env;

app.listen(3000, () => {
  console.log(`Listing on port ${PORT}`);
});

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});
