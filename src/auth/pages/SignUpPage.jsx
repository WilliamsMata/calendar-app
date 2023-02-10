import { Link } from "react-router-dom";

export const SignUpPage = () => {
  return (
    <>
      <h1 className="font-bold tracking-tight">Sign Up</h1>
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium  ">
            Your name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="input-bordered input-primary input w-full"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium  ">
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
          Sign up
        </button>
        <p className="text-sm font-light">
          Do you have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </>
  );
};
