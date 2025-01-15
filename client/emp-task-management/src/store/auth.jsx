import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authrizationToken = `Bearer ${token}`;


  const storeTokenLS = (serverToken) => {
    setToken(serverToken)
    return localStorage.setItem("token", serverToken)
  };

  let isLoggedIn = !!token;

  //tackling the logout function
  const LogoutUser = () => {
    setToken("")
    setUser("")
    return localStorage.removeItem('token');
  }

  // JWT AUTHENTICATION to get currently login user data
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:7000/api/auth/user",
        {
          method: "GET",
          headers: {
            Authorization: authrizationToken,
          }
        }
      )
      if (response.ok) {
        const data = await response.json();
        
        setUser(data.userData);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data")
    }
  }

  useEffect(() => {

    userAuthentication();
  }, [token]);

  return <AuthContext.Provider value={{isLoggedIn,  storeTokenLS,LogoutUser, user, authrizationToken, userAuthentication,isLoading,   }}>
    {children}
  </AuthContext.Provider>
}

export const useAuthentication = () => {
  return useContext(AuthContext)
}
