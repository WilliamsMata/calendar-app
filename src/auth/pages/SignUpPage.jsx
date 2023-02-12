import { Link } from "react-router-dom";
import { getSignUpMessageEN, getSingUpMessageES } from "../../helpers";
import { useLanguage } from "../../hooks";

export const SignUpPage = () => {
  const { isSpanish } = useLanguage();

  const { title, name, email, password, button, text, link } = isSpanish
    ? getSingUpMessageES()
    : getSignUpMessageEN();

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
            name="email"
            id="email"
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
            name="password"
            id="password"
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
