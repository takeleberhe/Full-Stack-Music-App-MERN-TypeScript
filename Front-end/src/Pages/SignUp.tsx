import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../Redux/Features/AuthSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/store";
import { Link } from "react-router-dom";
//define type of signUp form
interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormInputs>({ mode: "all" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const handleSignUp: SubmitHandler<SignUpFormInputs> = (data) => {
    dispatch(registerStart(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-md mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="p-2 outline-none rounded-md w-full border border-gray-300"
            {...register("name", {
              required: "Username required!",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters!",
              },
              maxLength: {
                value: 20,
                message: "Username must be at most 20 characters!",
              },
            })}
            placeholder="Enter your name"
          />
          <p className="text-red-700">{errors.name?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-md mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="p-2 outline-none rounded-md w-full border border-gray-300"
            {...register("email", {
              required: "Email required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email must be valid",
              },
            })}
            placeholder="Enter your email"
          />
          <p className="text-red-700">{errors.email?.message}</p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-md mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="p-2 outline-none rounded-md w-full border border-gray-300"
            {...register("password", {
              required: "Password required",
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
                message:
                  "Password must be 7-15 characters and include one numeric and one special character",
              },
            })}
            placeholder="Enter password"
          />
          <p className="text-red-700">{errors.password?.message}</p>
        </div>
        <button
          type="submit"
          className="w-full p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Sign Up
        </button>
        <div className="m-3 p-3">
          <h2 className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </h2>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
