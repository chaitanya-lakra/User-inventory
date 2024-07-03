import { createContext, useState , useEffect } from "react";



export const MyContext = createContext();

const GlobalState = ({ children }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);  
    const [socket , setSocket ] = useState([]);
    const [activeUsers , setActiveUsers] = useState(1);
    const [indexEdit , setIndexEdit]  =useState('')
    const [addOrEdit  , setAddOrEdit ] =useState('')
    const [ pagination , setPagination] = useState({
      from : 0,
      to:3
    })
    const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null
    );

    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);
   
    return (
      <MyContext.Provider
        value={{
          pagination,
          setPagination,
          addOrEdit,
          setAddOrEdit,
          indexEdit,
          setIndexEdit,
          activeUsers,
          setActiveUsers,
          isFormOpen,
          setIsFormOpen,  
          socket,
          setSocket,
          currentUser,
          setCurrentUser
        }}
      >
        {children}
      </MyContext.Provider>
    );
  };
  
  export default GlobalState;
  
