import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <>
      <h1 className="font-bold tracking-tight">Log in to your account</h1>
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Your email
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
            Password
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
          Sign in
        </button>
        <p className="text-sm font-light">
          Don’t have an account yet?{" "}
          <Link
            to="/auth/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
};
