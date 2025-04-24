import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ Import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // ⬅️ Hook to programmatically navigate
  const [token, setToken] = useState(localStorage.getItem("token_organic"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user_organic");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (t, u) => {
    localStorage.setItem("token_organic", t);
    localStorage.setItem("user_organic", JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("token_organic");
    localStorage.removeItem("user_organic");
    setToken(null);
    setUser(null);
    navigate("/dashboard", { replace: true });
    window.location.reload();

  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
