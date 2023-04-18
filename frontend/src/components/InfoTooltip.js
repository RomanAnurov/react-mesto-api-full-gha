import Statusfalse from "../images/Statusfalse.svg"
import Statustrue from '../images/Statustrue.svg'



function InfoToolip(props) {
  const { isOpen, onClose, registedStatus } = props;
  return (
    <div
      className={`popup ${isOpen ? "popup_type_opened" : ""}`}
    >
      <div className="popup__container popup__container_type_tooltip">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
        ></button>
        <img className="popup__icon" src={registedStatus !== 'error' ? Statustrue : Statusfalse} alt ="статус"/>
        <h2 className="popup__title popup__title_type_tooltip">
          {registedStatus !== 'error'
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoToolip;
