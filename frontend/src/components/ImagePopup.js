function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image-open ${
        card ? "popup_type_opened" : ""
      }`}
    >
      <div className="popup__container-image">
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__caption"> {card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
