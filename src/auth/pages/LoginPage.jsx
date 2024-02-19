import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import { useState } from "react";
import { useEffect } from "react";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormField = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerConfirmPassword: "",
};

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();

  const [passwordMatch, setPasswordMatch] = useState(true);

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  useEffect(() => {

    if(errorMessage !== undefined) {
      Swal.fire({
        title: 'Error in authentication',
        text: errorMessage,
        timer: 6000,
        icon: 'error',
        showConfirmButton: false
      });
    };

  }, [errorMessage]);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormField);

  const loginSubmit = event => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const registerSubmit = event => {
    event.preventDefault();

    if (registerPassword !== registerConfirmPassword) {
      setPasswordMatch(false);
      return;
    }

    setPasswordMatch(true);
    
    startRegister({ name: registerName, email: registerEmail, password: registerPassword });

  };

  return (
    <>
      <div className="w-full md:grid md:grid-flow-col h-screen min-h-screen max-h-screen">
        <div className="p-10 shadow-xl grid content-center min-h-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <h3 className="font-bold text-violet-700 text-4xl mb-6">Sign in</h3>
          <form onSubmit={loginSubmit}>
            <div className="my-2">
              <input
                type="text"
                className="px-3 h-11 focus:bg-white w-full text-slate-600 rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="email"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="my-2">
              <input
                type="password"
                className="px-3 h-11 focus:bg-white w-full text-slate-600 rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="password"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="my-2">
              <input
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-violet-700 hover:scale-[1.02] transition-all duration-150  w-full h-12 rounded font-bold text-white cursor-pointer"
                value="sign in"
              />
            </div>
          </form>
        </div>

        <div className="p-10 grid content-center min-h-full [background:radial-gradient(125%_125%_at_50%_10%,#100037_40%,#63e_100%)]">
          <h3 className="font-bold text-white text-4xl mb-6">Sign up</h3>
          <form onSubmit={registerSubmit}>
            <div className="my-2">
              <input
                type="text"
                className="px-3 h-11 focus:bg-white w-full text-slate-600 rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="name"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="my-2">
              <input
                type="email"
                className="px-3 h-11 focus:bg-white w-full text-slate-600 rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="my-2">
              <input
                type="password"
                className="px-3 h-11 focus:bg-white w-full text-slate-600 rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="my-2">
              <input
                type="password"
                className="px-3 h-11 focus:bg-white w-full text-slate-600 rounded border placeholder-slate-400 spacing font-medium text-sm outline-none focus:ring ring-violet-300 focus:border-violet-500 transition-all duration-150 hover:border-violet-400 bg-slate-100 border-slate-300 py-2"
                placeholder="repeat your password"
                name="registerConfirmPassword"
                value={registerConfirmPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            {!passwordMatch && (
              <div className="my-2">
                <div className="text-red-400 p-3 border border-red-400 bg-gradient-to-r from-red-800/30 rounded-md flex items-center gap-2 justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Passwords don't match!
                </div>
              </div>
            )}

            <div className="my-2">
              <input
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-violet-700 hover:scale-[1.02] transition-all duration-150  w-full h-12 rounded font-bold text-white cursor-pointer"
                value="sign up"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
