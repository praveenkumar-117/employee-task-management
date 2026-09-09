import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

 

export const AuthProvider = ({ children }) => {
const url = "http://localhost:7000";
 
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authrizationToken = `Bearer ${token}`;


  const storeTokenLS = (serverToken) => {
    setToken(serverToken)
    return sessionStorage.setItem("token", serverToken)
  };

  let isLoggedIn = !!token;

  //tackling the logout function
  const LogoutUser = () => {
    setToken("")
    setUser("")
    return sessionStorage.removeItem('token');
  }

  // JWT AUTHENTICATION to get currently login user data
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/api/auth/user`,
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

  return <AuthContext.Provider value={{isLoggedIn, url, storeTokenLS,LogoutUser, user, authrizationToken, userAuthentication,isLoading,   }}>
    {children}
  </AuthContext.Provider>
}

export const useAuthentication = () => {
  return useContext(AuthContext)
}
