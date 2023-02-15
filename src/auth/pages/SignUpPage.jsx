import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getSignUpMessageEN, getSingUpMessageES } from "../../helpers";
import { useAuthStore, useForm, useLanguage } from "../../hooks";

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const SignUpPage = () => {
  const [isSamePassword, setIsSamePassword] = useState(true);
  const { startRegister, errorMessage } = useAuthStore();

  const { isSpanish } = useLanguage();
  const {
    title,
    name,
    email,
    password,
    repeatPassword,
    button,
    text,
    link,
    error,
  } = isSpanish ? getSingUpMessageES() : getSignUpMessageEN();

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange,
  } = useForm(registerFormFields);

  useEffect(() => {
    registerPassword !== registerPassword2
      ? setIsSamePassword(false)
      : setIsSamePassword(true);
  }, [registerPassword, registerPassword2]);

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error", errorMessage, "error");
    }
  }, [errorMessage]);

  const registerSubmit = (event) => {
    event.preventDefault();

    if (!isSamePassword) {
      Swal.fire(error.samePassword.title, error.samePassword.text, "error");
      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  return (
    <>
      <h1 className="font-bold tracking-tight">{title}</h1>
      <form className="space-y-4 md:space-y-6" onSubmit={registerSubmit}>
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium  ">
            {name}
          </label>
          <input
            type="text"
            id="name"
            name="registerName"
            value={registerName}
            onChange={onInputChange}
            className={`input-bordered input-info input w-full`}
            placeholder={name}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium  ">
            {email}
          </label>
          <input
            type="email"
            id="email"
            name="registerEmail"
            value={registerEmail}
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
            name="registerPassword"
            value={registerPassword}
            onChange={onInputChange}
            placeholder="••••••••"
            className="input-bordered input-info input w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="repeat-password"
            className="mb-2 block text-sm font-medium  "
          >
            {repeatPassword}
          </label>
          <input
            type="password"
            id="repeat-password"
            name="registerPassword2"
            value={registerPassword2}
            onChange={onInputChange}
            placeholder="••••••••"
            className={`input-bordered input-info input w-full ${
              isSamePassword ? "" : "input-error"
            }`}
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
          <Link to="/auth/login" className="link-info link font-bold">
            {link}
          </Link>
        </p>
      </form>
    </>
  );
};
