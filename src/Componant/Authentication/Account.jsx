import React from 'react'
import { useDispatch} from 'react-redux'
import {  deleteUser} from '../../Redux/userSlice';
import { useNavigate } from 'react-router';
const Account = () => {
    const user = localStorage.getItem("userEmail")
    const dispatch = useDispatch();
    const navigate = useNavigate()

    function logout(){
        if (confirm("Are You sure you want to delete") === true) {
            console.log("deleted");
        dispatch(deleteUser());
        localStorage.removeItem("userEmail")
        navigate("/");
        }else{
            return
        }
    }
  return (
      <div className=' flex items-center justify-center p-4'>
          <div className=' p-4 rounded-md shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] w-full md:w-[600px] bg-gray-800 '>
            <div className=' flex gap-4 flex-col items-center justify-between'>
                  <img src="/account1.svg" alt="" className=' w-20 md:w-32 text-white'/>
                  <span className=' text-lg font-bold text-gray-300'>usreEmail : {user}</span>
                  <div className=' flex items-center justify-between gap-4'>
                      <button className=' bg-blue-500 px-3 rounded-2xl py-1 text-yellow-50 text-center' onClick={()=>navigate("/")}><span className=' mr-2'>&larr;</span> Back</button>
                  <button onClick={() => logout()} className=' bg-red-500 px-6 rounded-2xl py-1 text-yellow-50'>LOG OUT</button>
                  </div>
            </div>
             
    </div>

   </div>
  )
}

export default Account ;