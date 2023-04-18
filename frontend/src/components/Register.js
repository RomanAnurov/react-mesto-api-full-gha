import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    onRegister(email, password);

    console.log(formValue);
  };
  return (
    <div className="authorize">
      <p className="authorize__title">Регистрация</p>
      <form className="authorize__form" onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          className="authorize__input"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formValue.email}
          required
        />
        <input
          id="password"
          name="password"
          className="authorize__input"
          type="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={formValue.password}
          required
        />
        <button
          className="authorize__button"
          type="submit"
          onSubmit={handleSubmit}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="authorize__signup">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="authorize__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
