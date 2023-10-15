import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router'
import { userName } from '../../Redux/userSlice';

const AppLayout = () => {
  const user = localStorage.getItem("userEmail")
  const navigate = useNavigate()
  return (
    <div className=' w-full '>
      <div className=' text-white flex w-full z-50 items-center justify-between border-b-[1px] border-gray-600 h-12 p-4 lg:p-10 bg-gray-800 fixed top-0 left-0 '>
        <h1 onClick={() => navigate("/")} className=' text-base cursor-pointer md:text-2xl font-serif text-gray-300 font-extrabold flex items-center gap-1'>
          <img src="/expense.svg" alt=""  className=' w-10 '/>
          <span className=' text-blue-400'>Expensify</span>
        </h1>
        {!user ? <div className=' flex items-center gap-2 md:gap-5'>
          <button onClick={() => navigate("/signup")} className=' text-sm bg-gray-600 px-4 py-[3px] rounded-2xl md:text-base'>Sign up</button>
          <button onClick={() => navigate("/signin")} className=' text-sm bg-green-600 px-4 py-[3px] rounded-2xl md:text-base'>Log in</button>
        </div> : <span className=' flex items-center gap-1 cursor-pointer' onClick={()=>navigate("/account")} >
          <img src="account1.svg" alt="" className=' w-10' />
            <span className=' font-thin'>Account</span>
          </span>}
      </div>
      <div className=' mt-24  '>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout