import { MyContext } from "../context/context";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";


const adduserinfo = {
  full_name: '',
  username: '',
  password: '',
  phone_no: '',
  is_online:0

}


const PopUp = () => {

  const [adduser, setAdduser] = useState(adduserinfo);
  const { setIsFormOpen, socket,addOrEdit , indexEdit , setCurrentUser } = useContext(MyContext);
  const getUsers = useSelector(state => state.getDataReducer.users);


  


  //Add user
  const handleAdd = async (e) => {
    setIsFormOpen(false);
    const updatedArray = [...getUsers, adduser]
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/adduser", adduser);
      if (socket !== null && socket !== undefined && socket.length !== 0) {
        socket.emit('ok', updatedArray)
      }
      toast.success(res.data)
    } catch (err) { 
     
      toast.error(err.response.data)
    }
  }


  //candle edit or add
  const handleCancel = () => {
    setIsFormOpen(false);
  }



  //edit user
  const EditHandle = ()=>{
    console.log(indexEdit)
    try{
      const index = getUsers.findIndex(obj => obj.username === indexEdit);
      axios.post('http://localhost:8000/edit', {data : adduser , user : getUsers[index].username})
      getUsers[index].full_name = adduser.full_name
      getUsers[index].username = adduser.username
      getUsers[index].password = adduser.password
      getUsers[index].phone_no = adduser.phone_no
      if (socket !== null && socket !== undefined && socket.length !== 0) {
        socket.emit('ok', getUsers)
      }
      toast.success('user edited succesfully')
      // setCurrentUser(adduser.username)
      setIsFormOpen(false);
    }catch(err){
      toast.error(err.response.data)
    }
  }



  return (
    <div className="rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 w-[95vw] max-w-4xl space-y-8 px-3 py-5 sm:p-5">
      <h1 className="text-2xl font-semibold">Add User</h1>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-x-10 place-items-center">
        <div id="name" className="w-full flex flex-col items-start gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="full_name"
            className="w-full rounded-md p-2 border border-black outline-none bg-transparent focus:bg-white"
            onChange={(e) => setAdduser({ ...adduser, [e.target.name]: e.target.value })}
          />
        </div>
        <div id="username" className="w-full flex flex-col items-start gap-1">
          <label htmlFor="age">username</label>
          <input
            type="text"
            name="username"
            className="w-full rounded-md p-2 border border-black outline-none bg-transparent focus:bg-white"
            onChange={(e) => setAdduser({ ...adduser, [e.target.name]: e.target.value.trim() })}
          />
        </div>
        <div id="age" className="w-full flex flex-col items-start gap-1">
          <label htmlFor="age">password</label>
          <input
            type="password"
            name="password"
            className="w-full rounded-md p-2 border border-black outline-none bg-transparent focus:bg-white"
            onChange={(e) => setAdduser({ ...adduser, [e.target.name]: e.target.value.trim() })}
          />
        </div>
        <div id="age" className="w-full flex flex-col items-start gap-1">
          <label htmlFor="age">phone</label>
          <input
            type="number"
            name="phone_no"
            className="w-full rounded-md p-2 border border-black outline-none bg-transparent focus:bg-white"
            onChange={(e) => setAdduser({ ...adduser, [e.target.name]: e.target.value.trim() })}
          />
        </div>
      </form>
      <div className="overflow-hidden">
        <h1
          className="text-red-500 font-bold translate-y-full duration-300"
        >
          Please fill all the details
        </h1>
      </div>
      <div
        id="buttons"
        className="flex justify-end items-center gap-4 text-white font-semibold"
      >
        <button
          onClick={handleCancel}
          className="rounded-md bg-red-400 shadow-lg shadow-red-400 px-3 py-1.5 hover:scale-90 active:scale-75 duration-100"
        >
          Cancel
        </button>
        {
          addOrEdit === 'add'?
          <button
          onClick={(e) => handleAdd(e)}
          type="submit"
          className="rounded-md bg-blue-500 shadow-lg shadow-blue-400 px-3 py-1.5 hover:scale-90 active:scale-75 duration-100"
          >
          Submit
        </button>
        :
        <button
        onClick={(e) =>{
        EditHandle()
        }}
        type="submit"
        className="rounded-md bg-blue-500 shadow-lg shadow-blue-400 px-3 py-1.5 hover:scale-90 active:scale-75 duration-100"
      >
        edit 
      </button>
        }
      </div>
    </div>
  );
};

export default PopUp;
