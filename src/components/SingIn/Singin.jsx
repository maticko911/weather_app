import { useRef, useState, useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { HomeIcon } from "@heroicons/react/24/solid";

const Singin = () => {
  const userRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const validMail = () => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidMail(regex.test(email));
      setError(regex.test(email) ? "" : "Email is not valid!");
    };
    validMail();
  }, [email]);

  useEffect(() => {
    const validPwd = () => {
      const regex = /^(?=[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}/;
      setValidPwd(regex.test(pwd));
    };
    validPwd();
  }, [pwd]);

  useEffect(() => {
    const validMatchPwd = () => {
      const regex = /^(?=[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}/;
      setValidMatchPwd(regex.test(matchPwd));
    };
    validMatchPwd();
  }, [matchPwd]);

  useEffect(() => {
    if (pwd && matchPwd) {
      if (pwd === matchPwd) {
        setValidPwd(true);
        setValidMatchPwd(true);
        setPwdFocus(false);
        setMatchPwdFocus(false);
      } else {
        setValidPwd(false);
        setValidMatchPwd(false);
      }
    }
  }, [pwd, matchPwd]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pwd
      );
      const user = userCredential.user;

      // Check if user._tokenResponse is defined before accessing refreshToken
      if (user._tokenResponse && user._tokenResponse.refreshToken) {
        sessionStorage.setItem("Auth Token", user._tokenResponse.refreshToken);
        navigate("/login");
      } else {
        console.error("Refresh token is undefined");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center h-screen py-20">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Registration</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="email">
              Email:
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                className="block w-full px-4 py-2 border rounded-md bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
                required
                ref={userRef}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                aria-invalid={!validMail}
                aria-aria-describedby="uidnote"
                onChange={(e) => setEmail(e.target.value)}
              />
              {(email || emailFocus) && !validMail && (
                <p
                  id="uidnote"
                  className="mt-2 p-2 text-white rounded-md bg-red-500/75 text-lg">
                  <InformationCircleIcon className="h-5 w-5 mr-2 inline-block" />
                  {error}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-bold">
              Password:
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                required
                ref={pwdRef}
                aria-invalid={!validPwd}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="block w-full px-4 py-2 border rounded-md bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {pwdFocus && password && !validPwd && (
                <p
                  id="pwdnote"
                  className="mt-2 p-2 text-lg bg-red-500/75 rounded-md text-white">
                  <InformationCircleIcon className="h-5 w-5 mr-2 inline-block" />
                  8 to 20 characters. Must have at least one uppercase letter,
                  one lowercase letter, and one number.
                </p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-bold">
              Re-enter Password:
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                ref={pwdRef}
                aria-invalid={!validPwd}
                aria-describedby="pwdnote"
                onFocus={() => setMatchPwdFocus(true)}
                onBlur={() => setMatchPwdFocus(false)}
                className="block w-full px-4 py-2 border rounded-md bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {matchPwdFocus && pwd && !validMatchPwd && (
                <p
                  id="pwdnote"
                  className="mt-2 p-2 text-white text-lg rounded-md bg-red-500/75">
                  <InformationCircleIcon className="h-5 w-5 mr-2 inline-block" />
                  Passwords not match!
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Link to="/">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outlin ${
                  !validMail || !validPwd || !validMatchPwd
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                type="submit"
                onClick={handelSubmit}>
                Register
              </button>
            </Link>
          </div>
        </form>
        <div className="mt-10 text-center">
          <p>
            <HomeIcon className="w-5 h-5 inline-block mr-2 opacity-75" />
            Already register
            <span className="font-bold underline cursor-pointer hover:scale-105 transition duration-150 ease-in-out hover:text-blue-500/75 ml-2">
              <Link to="/">Home</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Singin;
