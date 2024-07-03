import { Input } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { MyContext } from "../context/context";
import { useSelector } from "react-redux";




const reg = {
    'full_name': '',
    'username': '',
    'password': '',
    'phone_no': ''
}


const log = {
    'username': '',
    'password': ''
}



const Login = () => {

  const getUsers = useSelector(state => state.getDataReducer.users);

  
  const { setCurrentUser,socket } = useContext(MyContext);
  const [signin, setSignin] = useState(log);
  const [signup, setSignup] = useState(reg);
  const [toggle, setToggle] = useState(true);
  const Navigate = useNavigate();
  
  useEffect(()=>{
      if(getUsers?.length>0){
          window.location.reload()
      }
       
  },[])


    //signup function
    const HandleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/signup" , signup)
            setCurrentUser(signup.username);
            toast.success('Registration successfull')
            Navigate('/home')
        } catch (err) {
            toast.error('username or password already exist')
        }

    }



    //login function
    const HandleLogin = async() => {
        try{
            await axios.post("http://localhost:8000/login" , signin)
            setCurrentUser(signin.username);
            Navigate('/home')
            toast.success('successfully logged in')
        }catch(err){
          
            toast.error(err.response.data)
        }
    }



        return (
        <div class="flex justify-center item-center">
            <div className="flex justify-between mt-20 w-7/12 h-screen max-md:w-11/12">
                <div
                    className=" flex-1 border h-4/6 flex flex-col justify-center items-center max-md:hidden"
                    style={{
                        backgroundImage: 'linear-gradient(to bottom right, rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)), url("https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        WebkitBoxShadow: '3px 3px 15px -3px rgba(46,74,117,0.46)',
                        MozBoxShadow: '3px 3px 15px -3px rgba(46,74,117,0.46)',
                        boxShadow: '3px 3px 15px -3px rgba(46,74,117,0.46)'
                    }}
                >
                    <h1 className="text-white text-5xl m-6">welcome!</h1>
                    <p className="text-white text-center" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, perspiciatis.</p>

                </div>
                <div className="flex-1 h-4/6" style={{
                    WebkitBoxShadow: '3px 3px 15px -3px rgba(46,74,117,0.46)',
                    MozBoxShadow: '3px 3px 15px -3px rgba(46,74,117,0.46)',
                    boxShadow: '3px 3px 15px -3px rgba(46,74,117,0.46)'
                }}>
                    <div className="mt-3 flex item-center justify-center">
                        <span style={{
                            padding: '10px 20px',
                            fontWeight: 600,
                            border: 'none',
                            borderRadius: '30px',
                        }} className={`border ${toggle ? 'bg-blue-500 text-white' : 'bg-white text-black'} px-6 m-4 cursor-pointer`} onClick={() => { if (!toggle) setToggle(true) }}>Login</span>
                        <span style={{
                            padding: '10px 20px',
                            fontWeight: 600,
                            border: 'none',
                            borderRadius: '30px',
                        }} className={`border ${toggle ? 'bg-white text-black' : 'bg-blue-500 text-white'} px-6 m-4 cursor-pointer`} onClick={() => { if (toggle) setToggle(false) }}>Registration</span>
                    </div>
                    {
                        toggle ?
                            (
                                <div className="flex justify-center items-center mt-2 max-md:mt-10">
                                    <form className="flex flex-col" onSubmit={(e) => {
                                        HandleLogin()
                                      
                                        e.preventDefault();
                                    }}>
                                        <h1 className="font-bold">SIGN IN</h1>
                                        <label>
                                            <PersonIcon />
                                            <Input style={{ padding: 10, margin: '10px 0' }} placeholder="username" name='username' onChange={(e) => setSignin({ ...signin, [e.target.name]: e.target.value.trim() })} />
                                        </label>
                                        <label >
                                            <LockIcon />
                                            <Input style={{ padding: 10, margin: '10px 0' }} placeholder="password" type='password' name='password' onChange={(e) => setSignin({ ...signin, [e.target.name]: e.target.value.trim() })} />
                                        </label>
                                        <button class="bg-blue-500 rounded-3xl mt-10 hover:scale-90 active:scale-75 bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">Login</button>
                                    </form>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center mt-2 max-md:mt-10">

                                    <form onSubmit={(e) => HandleSignup(e)} className="flex flex-col">
                                        <h1 className="font-bold">SIGN UP</h1>
                                        <label>
                                            <PersonIcon />
                                            <Input style={{ padding: 10, margin: '10px 0' }} placeholder="username" name='username' onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value.trim() })} />
                                        </label>
                                        <label >
                                            <LockIcon />
                                            <Input style={{ padding: 10, margin: '10px 0' }} placeholder="password" name='password' type='password' onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value.trim() })} />
                                        </label>
                                        <label>
                                            <AccountCircleIcon />
                                            <Input style={{ padding: 10, margin: '10px 0' }} placeholder="full name" name='full_name' onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })} />
                                        </label>
                                        <label >
                                            <LocalPhoneIcon />
                                            <Input style={{ padding: 10, margin: '10px 0' }} placeholder="phone" name='phone_no' type='number' onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value.trim() })} />
                                        </label>
                                        <button class="bg-blue-500 rounded-3xl mt-4 hover:scale-90 active:scale-75 bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">Register</button>


                                    </form>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Login;