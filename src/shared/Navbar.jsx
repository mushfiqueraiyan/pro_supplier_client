import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/GetAuth";
import { User } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink to={"/add-rider"}>Join as Rider</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/addParcel"}>Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink>Be a Rider</NavLink>
      </li>
    </>
  );

  return (
    <div className="">
      <div className="navbar bg-base-100 rounded-none md:rounded-none lg:rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#CAEB66] bg-gray-100 flex items-center justify-center">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="text-gray-500 w-6 h-6" />
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-[#CAEB66] border-none text-black hover:bg-[#b5d95d] transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to={"/login"} className="btn rounded-lg text-gray-600">
                Sign In
              </Link>
              <Link className="btn rounded-lg bg-[#CAEB66]">Be a Rider</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
