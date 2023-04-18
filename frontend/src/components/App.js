import React from "react";
import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    email: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  const [registedTooltipOpen, setRegistedTooltipOpen] = useState(false);

  const [registedTooltipStatus, setRegistedTooltipStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .chekToken(jwt)
        .then((data) => {
          setCurrentUser((userData) => ({
            ...userData,
            email: data.email,
          }));
          setIsLoggedIn(true);
          navigate('/', {replace: true});
        })
        .catch((err) => {
          console.log(`Ошибка.....: ${err}`);
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardData]) => {
          setCurrentUser((dataState) => ({ ...dataState, ...userData }));
          setCards(cardData);
        })
        .catch((err) => {
          console.log(`Ошибка.....: ${err}`);
        });
    }
  }, [isLoggedIn]);

  /* 
      .then((data) => {
        setCurrentUser({
          ...data,
          _id: data._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);*/

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCardApi(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    api
      .editUserData(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    api
      .updateAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setRegistedTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleSignUp(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setRegistedTooltipStatus("success");
        setRegistedTooltipOpen(true);

        navigate("/sign-in");
      })
      .catch((err) => {
        setRegistedTooltipStatus("error");
        setRegistedTooltipOpen(true);

        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleSignIn(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setRegistedTooltipStatus("error");
        setRegistedTooltipOpen(true);

        console.log(`Ошибка.....: ${err}`);
      });
  }

  function userOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header onSignout={userOut} />
        <Routes>
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route
              path="/"
              element={
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Route>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleSignUp} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleSignIn} />} />
        </Routes>
        <Footer />
        {/*Попап Профиля*/}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/*Попап Добавления карточки*/}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/*Попап Подтверждения удаления*/}
        <PopupWithForm
          onClose={closeAllPopups}
          name="confirmDelete"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>
        {/*Попап Редактирования Аватара*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoToolip
          isOpen={registedTooltipOpen}
          onClose={closeAllPopups}
          registedStatus={registedTooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;