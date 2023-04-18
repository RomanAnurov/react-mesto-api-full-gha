const router = require('express').Router();

const { createCardValidation, cardIdValidation } = require('../middlewares/celebrate-validate');

const {
  getCards,
  createCard,
  deleteCardById,
  putLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCardValidation, createCard);

router.delete('/:cardId', cardIdValidation, deleteCardById);

router.put('/:cardId/likes', cardIdValidation, putLikeCard);

router.delete('/:cardId/likes', cardIdValidation, deleteLikeCard);

module.exports = router;
