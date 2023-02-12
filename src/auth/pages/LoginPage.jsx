import { Link } from "react-router-dom";
import { getLoginMessageEN, getLoginMessageES } from "../../helpers";
import { useLanguage } from "../../hooks";

export const LoginPage = () => {
  const { isSpanish } = useLanguage();

  const { title, email, password, button, text, link } = isSpanish
    ? getLoginMessageES()
    : getLoginMessageEN();

  return (
    <>
      <h1 className="font-bold tracking-tight">{title}</h1>
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
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
          <Link
            to="/auth/signup"
            className="text-base font-medium text-accent transition hover:text-accent-focus hover:underline"
          >
            {link}
          </Link>
        </p>
      </form>
    </>
  );
};
