import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  email: "Geçerli bir email adresi giriniz.",
  password:
    "Şifre en az 8 karakter olmalı; büyük harf, küçük harf, rakam ve özel karakter içermelidir.",
  terms: "Devam etmek için şartları kabul etmelisiniz.",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

  const validateField = (name, value) => {
    if (name === "email") {
      return emailRegex.test(value) ? "" : errorMessages.email;
    }
    if (name === "password") {
      return strongPasswordRegex.test(value) ? "" : errorMessages.password;
    }
    if (name === "terms") {
      return value === true ? "" : errorMessages.terms;
    }
    return "";
  };

  useEffect(() => {
    const emailOk = emailRegex.test(form.email);
    const passwordOk = strongPasswordRegex.test(form.password);
    const termsOk = form.terms === true;

    setIsValid(emailOk && passwordOk && termsOk);
  }, [form]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    const errorMsg = validateField(name, fieldValue);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;

    setForm(initialForm);
    history.push("/success");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="ornek@mail.com"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="error-message" data-cy="error-email">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password">Şifre</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Güçlü şifre girin"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="error-message" data-cy="error-password">
            {errors.password}
          </p>
        )}
      </div>

      <div>
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={form.terms}
          onChange={handleChange}
        />
        <label htmlFor="terms">Şartları kabul ediyorum</label>
        {errors.terms && (
          <p className="error-message" data-cy="error-terms">
            {errors.terms}
          </p>
        )}
      </div>

      <button type="submit" disabled={!isValid}>
        Login
      </button>
    </form>
  );
}