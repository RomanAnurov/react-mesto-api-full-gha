const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const EmailRepeatError = require('../errors/EmailRepeatError');
const User = require('../models/user');

// Получить всех пользователей

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// Создать пользователя

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new EmailRepeatError('Такой email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
// Получить пользователя по роуту users/me

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)

    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

// Получить пользователя по id

const getUserById = (req, res, next) => {
  const {
    userId,
  } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Обновить информацию о пользователе

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const {
    name,
    about,
  } = req.body;

  User.findByIdAndUpdate(userId, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })

    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
// Обновить Аватар

const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const {
    avatar,
  } = req.body;

  User.findByIdAndUpdate(userId, {
    avatar,
  }, {
    new: true,
    runValidators: true,
  }).then((user) => {
    res.send(user);
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// controllers/users.js

const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({
        _id: user._id,
      }, 'some-secret-key', {
        expiresIn: '7d',
      });

      // вернём токен
      res.send({
        token,
      });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUser,
};
