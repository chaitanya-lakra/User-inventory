
import Login from "./pages/login";
import Home from "./pages/home";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect } from "react";
import { MyContext } from "./context/context";
import { io } from "socket.io-client";



 



function App() {
  const {currentUser, setSocket} = useContext(MyContext);


  useEffect(()=>{
    const socket1 =  io('http://localhost:8000')
    setSocket(socket1)
    return ()=> socket1.disconnect();
  },[])

  
  
  

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const ProtectedHome = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/home" />;
    }
    return children;
  };



  const router = createBrowserRouter([
    {
      path: "/",
      element:
          <Login/>
  
     
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        )
    },
  ]);

  return (
    <div>
      <Toaster/>
      <RouterProvider router={router} />

    </div>
  );
}



export default App
