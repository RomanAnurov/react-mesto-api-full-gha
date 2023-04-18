import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="editAvatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <>
        <input
          id="avatar"
          ref={avatarRef}
          className="popup__input popup__input_type_avatar-url"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="avatar-error popup__input-error"></span>
      </>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
