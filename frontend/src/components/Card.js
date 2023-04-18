import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `elements__icon ${
    isLiked && "elements__icon_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="elements__item">
      <img
        src={card.link}
        className="elements__foto"
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button className="elements__icon-basket" onClick={handleDeleteClick} />
      )}

      <div className="elements__info">
        <h2 className="elements__caption">{card.name}</h2>
        <div className="elements__like">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <p className="elements__counter-like">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;