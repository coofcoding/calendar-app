import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { calendarApi } from "./../api";
import { checking, clearErrorMessage, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    console.log({ email, password });

    try {
      dispatch(checking());
      const { data } = await calendarApi.post("/auth", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Incorrect credentials"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      dispatch(checking());
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      !!error.response.data.msg && dispatch(onLogout(error.response.data.msg));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch( onLogout() );
  }

  return {
    //* Properties
    status,
    user,
    errorMessage,

    //* Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  };
};
