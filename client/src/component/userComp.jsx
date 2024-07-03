import { useContext } from "react";
import { MyContext } from "../context/context";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";




const UserComp = ({currUser})=>{
  const getUsers = useSelector(state => state.getDataReducer.users);
  const {socket , setIndexEdit,setAddOrEdit,currentUser ,setIsFormOpen} = useContext(MyContext);


  //delete user
  const Delete = async()=>{
    const updatedProducts = getUsers.filter((ele)=> currUser.username !== ele.username);
    try{
      const res = await axios.post("http://localhost:8000/delete" , {data : currUser.username});
      socket.emit('ok',updatedProducts)
      toast.success(res.data)
     
    }catch(err){
     toast.error(err.response.data)
     console.log(err)
    }
  }


  
    return(
    <div className="border text-start p-3 space-y-3 shadow-xl rounded-2xl md:p-5 h-full">
    <div className="flex justify-between items-center">
      <h1 className="text-lg font-bold">{currUser.full_name}</h1>
      <div
        className={`rounded-full p-4 w-min ${currUser.is_online? 'bg-green-500' : 'bg-gray-500'}`}
      ></div>
    </div>
    <hr />
    <p>
      username : <span className="font-bold">{currUser.username}</span>
    </p>
    <p>
      password : <span className="font-bold">{currUser.password}</span>
    </p>
    <p>
      phone : <span className="font-bold">{currUser.phone_no}</span>
    </p>
    <hr />
    <div
      id="buttons"
      className="flex justify-between items-center text-white font-semibold"
    >
      <button onClick={()=>Delete()}
        className="min-w-[65px] rounded-md bg-red-400 shadow-lg shadow-red-400 px-3 py-1.5 hover:scale-90 active:scale-75 duration-100"
        disabled={currUser.username===currentUser}
      >
        Delete
      </button>
      <button className="min-w-[65px] rounded-md bg-blue-400 shadow-lg shadow-blue-400 px-3 py-1.5 hover:scale-90 active:scale-75 duration-100"
      disabled={currUser.is_online && currUser.username!==currentUser}
      onClick={()=>{
        setIsFormOpen(true)
        setIndexEdit(currUser.username)
        setAddOrEdit('edit')
      }}
      >
        Edit
      </button>
    </div>
  </div>
);
};

export default UserComp;
