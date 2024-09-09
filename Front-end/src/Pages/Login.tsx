import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../Redux/Features/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { RootState } from "../Redux/store";
//define type of formInput
interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({ mode: "all" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const handleSignIn: SubmitHandler<IFormInput> = async (data) => {
    const payload = data;
    dispatch(loginStart(payload));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-full max-w-sm bg-white rounded-md p-6 shadow-lg"
      >
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
            placeholder="Enter email"
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
            {...register("password", {
              required: "Password required",
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
                message:
                  "Password must be 7-15 characters and include one numeric and one special character",
              },
            })}
            className="p-2 outline-none rounded-md w-full border border-gray-300"
            placeholder="Enter password"
          />
          <p className="text-red-700">{errors.password?.message}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Create Account
            </Link>
          </h2>
        </div>
        <button
          className="w-full p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
