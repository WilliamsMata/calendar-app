import { Link } from "react-router-dom";
import { getSignUpMessageEN, getSingUpMessageES } from "../../helpers";
import { useLanguage } from "../../hooks";

export const SignUpPage = () => {
  const language = useLanguage();

  const { title, name, email, password, button, text, link } =
    language === "es" ? getSingUpMessageES() : getSignUpMessageEN();

  return (
    <>
      <h1 className="font-bold tracking-tight">{title}</h1>
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium  ">
            {name}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="input-bordered input-primary input w-full"
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
            name="email"
            id="email"
            className="input-bordered input-primary input w-full"
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
            name="password"
            id="password"
            placeholder="••••••••"
            className="input-bordered input-primary input w-full"
            required
          />
        </div>
        <button type="submit" className="btn-primary btn w-full">
          {button}
        </button>
        <p className="text-sm font-light">
          {text}
          <Link
            to="/auth/login"
            className="text-base font-medium text-accent transition hover:text-accent-focus hover:underline"
          >
            {link}
          </Link>
        </p>
      </form>
    </>
  );
};
