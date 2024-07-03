
import UserComp from "./userComp";
import { useSelector } from 'react-redux';
import { useContext } from "react";
import { MyContext } from "../context/context";



const Dash = () => {
  const {setIsFormOpen, activeUsers,setAddOrEdit,pagination} = useContext(MyContext);
  const getUsers = useSelector(state => state.getDataReducer.users);

  //number of pages in screen, which is 3 in this case
  const page = getUsers?.slice(pagination.from,pagination.to)
  


  return (
    <>
    {
    page?
      <div className="mt-10 mx-4 md:mt-7 md:m-10 max-w-7xl space-y-10 xl:mx-auto">
        <div className="flex justify-between items-center">
          <h1 className=" text-3xl font-extrabold md:text-5xl">Active Users({activeUsers})</h1>
          <button
            className="px-4 py-3 font-bold rounded-full bg-blue-500 shadow-xl shadow-blue-400 text-white duration-300 hover:scale-90 active:scale-75 scale-90 md:scale-100 md:px-5 md:py-4"
            onClick={() => {
              setAddOrEdit('add')
              setIsFormOpen(true)
            }}
            >
            <i className="fa-solid fa-plus"></i> Add User
          </button>
        </div>
        <div className="border-b-2 border-dashed"></div>
        {
          page.length !== 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 md:gap-20">
              {page.map((currUser, index) => {
                return (
                  <UserComp key={index} indexValue={index} currUser={currUser} />
                )
              }
              )}
            </div>
          ) : (
            <div>
              <h1 className="text-center text-xl mx-auto my-52 font-semibold">
                No users to display
              </h1>
            </div>
          )}
         
      </div>
      :""}
    </>
  )
}
export default Dash;