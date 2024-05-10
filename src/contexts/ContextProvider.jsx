import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(sessionStorage.getItem("TOKEN") || null);
  const [notification, _setNotification] = useState("");

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      sessionStorage.setItem("TOKEN", token);
    } else {
      sessionStorage.removeItem("TOKEN");
    }
  };

  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        notification,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
