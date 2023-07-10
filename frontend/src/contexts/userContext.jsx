import { createContext, useMemo, useState } from "react";
import { PropTypes } from "prop-types";

const userContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
    }),
    [user]
  );

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
UserProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default userContext;
