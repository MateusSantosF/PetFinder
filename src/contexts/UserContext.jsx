
import { createContext,useContext } from "react";
import useAuth from "../hooks/useAuth";

const UserContext = createContext({})

function UserProvider({children}){


    const {register, authUser, authenticated, logout, login, getCurrentUser} = useAuth();

    return(
        <UserContext.Provider value={{register, authUser, isAuthenticated:authenticated, login, logout, getCurrentUser}}>
            {children}
        </UserContext.Provider>
    ) 
}

const useUserContext = () => useContext(UserContext)

export { useUserContext, UserProvider} 
