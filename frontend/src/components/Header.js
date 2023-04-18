import headerLogo from "../images/Vector.svg";
import { Routes, Route, Link} from 'react-router-dom';
import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";

function Header({onSignout}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип" className="header__logo" />
      <Routes>
          <Route path="/" element={<div className="header__links">
             <div className="header__link">{currentUser.email}</div>
                <Link className="header__link-out" onClick={onSignout} to="/sign-in">Выйти</Link>
             </div>} />
           <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
          <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Зарегистрироваться</Link>} />
       </Routes>
    </header>
  );
}
export default Header;
