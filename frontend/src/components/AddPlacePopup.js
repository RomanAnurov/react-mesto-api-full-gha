import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="addCard"
      title="Новое место"
      buttonText="Создать"
    >
      <>
        <input
          id="card-name"
          onChange={handleChangeName}
          value={name}
          className="popup__input popup__input_type_card-name"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="card-name-error popup__input-error"></span>
        <input
          id="url"
          onChange={handleChangeLink}
          value={link}
          className="popup__input popup__input_type_card-url"
          type="url"
          name="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="url-error popup__input-error"></span>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
