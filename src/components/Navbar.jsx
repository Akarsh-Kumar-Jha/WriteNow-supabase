import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const {user,loading} = useContext(AuthContext);
  return (
    <nav className='w-[90%] h-[10vh] bg-black/30 rounded-2xl flex justify-between items-center absolute top-5 shadow-2xl backdrop-blur-xl px-3 py-1'>
<div className='w-[110px] h-auto'>
  <img className='h-full w-full' src="https://kbcuiyitunpejxjppefq.supabase.co/storage/v1/object/public/Logo/Gemini_Generated_Image_s1ok0bs1ok0bs1ok-removebg-preview.png" alt="" />
</div>
<div className='w-[60px] h-[80%] rounded-full bg-gray-800 flex justify-center items-center'>
  <img className='h-[100%] w-full' src={user?.user_metadata?.avatarUrl} alt="" />
</div>
</nav>
  )
}

export default Navbar