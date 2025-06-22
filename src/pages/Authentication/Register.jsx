import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/GetAuth";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createAccount, loader, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;

    const userData = {
      displayName: name,
    };

    createAccount(email, password)
      .then((res) => {
        setUser(res.user);
        console.log(res.user);
        updateProfile(res.user, userData)
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-5xl font-bold">Create an Account</h1>
      <p>Register with Pro Supplier</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fieldset mt-10 mb-3 pr-0 md:pr-0 lg:pr-30"
      >
        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          className="input w-full"
          placeholder="Full Name"
          {...register("name")}
        />
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input w-full"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <p className="text-red-600">Email is Required</p>
        )}
        <label className="label">Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password?.type === "required" && (
          <p className="text-red-600">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-600">Password must be 6 character longer</p>
        )}
        <input type="submit" value="Submit" className="btn bg-[#CAEB66] mt-5" />
      </form>

      <div className="pr-0 md:pr-0 lg:pr-30">
        <p>
          Already have an account?{" "}
          <Link to={"/login"} className="text-[#CAEB66]">
            Login
          </Link>
        </p>
        <div className="text-center mt-5">
          <p>Or</p>
        </div>
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

export default Register;
