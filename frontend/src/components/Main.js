import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-update">
          <img
            src={currentUser.avatar}
            alt="аватарка"
            className="profile__avatar"
          />
          <button
            className="profile__avatar-edit"
            onClick={onEditAvatar}
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              aria-label="Edit"
              className="profile__edit-button"
              onClick={onEditProfile}
              type="button"
            ></button>
          </div>
          <p className="profile__sub-title">{currentUser.about}</p>
        </div>

        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
