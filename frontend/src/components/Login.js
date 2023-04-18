import React, { useState } from "react";


function Login({ onLogin }) {
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

    onLogin(email, password);
  };

  return (
    <div className="authorize">
      <p className="authorize__title">Вход</p>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
