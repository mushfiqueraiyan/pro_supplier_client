import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/GetAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { login, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-5xl font-bold">Welcome Back</h1>
      <p>Login with Pro Supplier</p>

      <form onSubmit={handleSubmit(onSubmit)} className="fieldset mt-15 w-4/5">
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input w-full"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <p className="text-red-600">Email is Required</p>
        )}
        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="input w-full"
          {...register("password", { required: true })}
        />

        {errors.password?.type === "required" && (
          <p className="text-red-600">Passoword is Required</p>
        )}

        <input type="submit" value="Login" className="btn bg-[#CAEB66] mt-3" />
      </form>

      <div className="mt-2 w-4/5">
        <p>
          Don't have any account?{" "}
          <Link to={"/register"} className="text-[#CAEB66]">
            Register
          </Link>
        </p>
        <p className="text-center">Or</p>
        <button className="btn w-full mt-5 bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
