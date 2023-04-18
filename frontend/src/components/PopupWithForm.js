
function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_type_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={props.onClose}
          type="button"
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" onSubmit={props.onSubmit} name={props.name} noValidate>
          {props.children}
          <button className="popup__save" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
