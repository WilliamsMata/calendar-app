import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { getLoginMessageEN, getLoginMessageES } from "../../helpers";
import { useAuthStore, useForm, useLanguage } from "../../hooks";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export const LoginPage = () => {
  const { isSpanish } = useLanguage();
  const { title, email, password, button, text, link } = isSpanish
    ? getLoginMessageES()
    : getLoginMessageEN();

  const { loginEmail, loginPassword, onInputChange } = useForm(loginFormFields);
  const { startLogin, errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  return (
    <>
      <h1 className="font-bold tracking-tight">{title}</h1>
      <form className="space-y-4 md:space-y-6" onSubmit={loginSubmit}>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            {email}
          </label>
          <input
            type="email"
            id="email"
            name="loginEmail"
            value={loginEmail}
            onChange={onInputChange}
            className="input-bordered input-info input w-full"
            placeholder="name@company.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium  "
          >
            {password}
          </label>
          <input
            type="password"
            id="password"
            name="loginPassword"
            value={loginPassword}
            onChange={onInputChange}
            placeholder="••••••••"
            className="input-bordered input-info input w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="btn-info btn w-full transition hover:brightness-110"
        >
          {button}
        </button>

        <p className="text-sm font-light">
          {text}
          <Link to="/auth/signup" className="link-info link font-bold">
            {link}
          </Link>
        </p>
      </form>
    </>
  );
};
