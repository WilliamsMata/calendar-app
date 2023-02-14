import { Link } from "react-router-dom";
import { getSignUpMessageEN, getSingUpMessageES } from "../../helpers";
import { useForm, useLanguage } from "../../hooks";

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const SignUpPage = () => {
  const { isSpanish } = useLanguage();
  const { title, name, email, password, repeatPassword, button, text, link } =
    isSpanish ? getSingUpMessageES() : getSignUpMessageEN();

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange,
  } = useForm(registerFormFields);

  const registerSubmit = (event) => {
    event.preventDefault();
    console.log({
      registerName,
      registerEmail,
      registerPassword,
      registerPassword2,
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
            className="input-bordered input-info input w-full"
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
          <Link to="/auth/login" className="link-info link font-bold">
            {link}
          </Link>
        </p>
      </form>
    </>
  );
};
