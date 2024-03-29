import Nav from "../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setError, setUser as setuser } from "../redux/slices/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErr(null);
  }, [user, pwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = {};
    if (!user) {
      error.user = "Please enter a username";
    }
    if (!email) {
      error.email = "Please enter a email";
    } else if (!pwd) {
      error.pwd = "Please enter a password";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.email = "Please enter a valid email";
    }
    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(pwd)
    ) {
      error.pwd =
        "Password must contain at least 8 characters, including UPPER/lowercase and numbers";
    }
    setErr(error);
    if (!error.user && !error.email && !error.pwd) {
      const userr = await signup(user, email, pwd, setErr, setLoading);

      if (userr?.user?.id) {
        dispatch(setError(null));
        dispatch(setuser({ user: userr.user }));
        navigate("/");
      }
    }
  };

  return (
    <>
      <Nav>
        <li>
          <Link
            to={"/login"}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </Link>
        </li>
      </Nav>

      <div className="">
        <div className="container flex justify-center min-h-[80vh]  items-center  ">
          <div className="w-full max-w-xs ">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
              onSubmit={handleSubmit}
            >
              {err?.response && (
                <p className="text-red-500 text-xs italic">{err.response}</p>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className={`${
                    err?.user ? "border-red-500" : ""
                  } shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                />
                {err?.user && (
                  <p className="text-red-500 text-xs italic">{err.user}</p>
                )}
              </div>
              {/*  */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`${
                    err?.user ? "border-red-500" : ""
                  } shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="email"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {err?.email && (
                  <p className="text-red-500 text-xs italic">{err.email}</p>
                )}
              </div>
              {/*  */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={`${
                    err?.user ? "border-red-500" : ""
                  } shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  type="password"
                  placeholder="***********"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                />
                {err?.pwd && (
                  <p className="text-red-500 text-xs italic">{err.pwd}</p>
                )}
              </div>
              {/*  */}
              <div className="flex items-center justify-between">
                <button
                  disabled={err || loading}
                  className="disabled:opacity-55 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
