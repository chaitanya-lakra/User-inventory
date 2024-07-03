
import Navbar from "../component/navbar";
import Dash from "../component/dash";
import PopUp from "../component/PopUp";
import { useContext } from "react";
import { MyContext } from "../context/context";
import { useEffect } from "react";
import { OfflineStatus } from "../redux/action/dataApi";
import { useSelector, useDispatch } from 'react-redux';
import { getUserss } from "../redux/action/dataApi";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";





const Home = () => {

  const { currentUser, setCurrentUser,activeUsers, socket, isFormOpen, setActiveUsers, setPagination, pagination } = useContext(MyContext);
  const dispatch = useDispatch();
  const getUsers = useSelector(state => state.getDataReducer.users);




  useEffect(()=>{
    if(getUsers!==undefined && getUsers?.length === 0 ){
      dispatch(getUserss(socket)); //get user list from database
    }
  if (socket !== null && socket !== undefined && socket.length !== 0) {


    //incomeing realtime data 
    socket.on('ok', (msg) => {
      if(msg.length !== getUsers?.length){
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: msg }); //store data (redux)       
        
      }
    })

   
  }
  },[dispatch,getUsers])


  

  //count active users

 useEffect(() => {
    var count = 0;
    if (getUsers !== undefined && getUsers !== null && getUsers.length > 0) {
      getUsers.map((ele) => {
        if (ele.is_online === 1) {
          ++count
        }
      })
      setActiveUsers(count)
    }
    if(getUsers?.length === 0){
      setActiveUsers(0)
    }

    // if(activeUsers === 0){
    //   navigate('/')
    // }
  }, [getUsers, setActiveUsers])




//set offline status
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const index = getUsers.findIndex(obj => obj.username === currentUser);
        if (index !== -1) { 
          const updatedProducts = [...getUsers];
          updatedProducts[index] = { ...updatedProducts[index], is_online: 0 };
          dispatch(OfflineStatus(socket, currentUser, updatedProducts, updatedProducts[index].is_online))
          setCurrentUser('')
        }
       
      }
    };
    window.addEventListener('unload', function (event) {
      const index = getUsers.findIndex(obj => obj.username === currentUser);
      if (index !== -1) { 
        const updatedProducts = [...getUsers];
        updatedProducts[index] = { ...updatedProducts[index], is_online: 0 };
        dispatch(OfflineStatus(socket, currentUser, updatedProducts, updatedProducts[index].is_online))
        socket.emit('ok', updatedProducts); 
        
      }
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [getUsers, currentUser]);






  //set online status to a user

  useEffect(() => {
    if (getUsers !== undefined && getUsers !== null && getUsers.length > 0) {
      const index = getUsers.findIndex(obj => obj.username === currentUser);
      if (index !== -1) {
        if (getUsers[index].is_online === 0) {
          const updatedProducts = [...getUsers];
          updatedProducts[index] = { ...updatedProducts[index], is_online: 1 };
          dispatch(OfflineStatus(socket, currentUser, updatedProducts, updatedProducts[index].is_online))
        }
      }
    }
  }, [getUsers])




  //handle pagination
  const HandleChange = (e, p) => {
    const from = (p - 1) * 3
    const to = (p - 1) * 3 + 3
    setPagination({ ...pagination, from: from, to: to })
  }



  return (
    <div>
      {isFormOpen ? (
        <div className="h-screen w-screen fixed z-20 bg-black/50"></div>
      ) : null}
      {isFormOpen ? <PopUp /> : null}
      <Navbar />
      <Dash />
      <div className="flex item-center justify-center m-10">
        <Pagination
          count={Math.ceil(getUsers?.length / 3)}
          color='primary'
          page={(pagination?.from / 3) + 1}
          onChange={(e, p) => HandleChange(e, p)} />

      </div>
    </div>
  )
}
export default Home;