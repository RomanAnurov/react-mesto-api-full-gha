const router = require('express').Router();
const {
  getUserByIdValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
} = require('../middlewares/celebrate-validate');

const {
  getUsers,
  getUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:userId', getUserByIdValidation, getUserById);

router.patch('/me', updateUserInfoValidation, updateUserInfo);

router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = router;
