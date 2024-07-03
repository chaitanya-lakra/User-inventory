import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Navbar = () => {



  return (
    <header className="sticky top-0 z-10 w-full flex justify-between items-center px-6 py-5 bg-zinc-900 text-white text-xl shadow-xl shadow-zinc-400">
      <h1 className="font-bold">
        Users <span className="text-blue-400">Inventory</span>
      </h1>
      <div className="item-center"> 
      <AccountCircleIcon/>
      </div>
    </header>
  );
};

export default Navbar;
