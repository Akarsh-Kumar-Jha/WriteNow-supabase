import React, { useEffect, useState } from "react";
import supabase from "../supabaseConnection";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Login() {

    const [inputData,setInputData] = useState({
        email:'',
        password:''
    });
    const [apiCalled,setApiCalled] = useState(false);
    const navigate = useNavigate();


    const handleChange = (event) => {
const {name,value} = event.target;
if(!value){
    return;
}
setInputData((prev) => ({
    ...prev,
    [name]:value
}));
    }

    const handleSubmit = async(event) => {
event.preventDefault();
setApiCalled(true);
console.log("Submitted Data -> ",inputData);
const {data,error} = await supabase.auth.signInWithPassword(inputData);
if(error){
    toast.error(`Login Failed ${error}`,{
        duration:4000
    });
    console.log("error -> ",error);
    setApiCalled(false);
    return;
}
setApiCalled(false);
navigate('/');
console.log('Login Data = ',data);
    }
  return (
    <div className="h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black flex justify-center items-center">
      <div className="h-[80%] w-[90%] max-w-5xl bg-zinc-800/60 backdrop-blur-2xl rounded-3xl shadow-xl shadow-blue-500/20 flex overflow-hidden">
        
        {/* Left Section - Form */}
        <div className="w-[60%] h-full flex justify-center items-center">
          <div className="w-[80%] max-w-md flex flex-col gap-y-8">
            <h2 className="text-4xl font-bold text-white text-center drop-shadow-lg">
              Welcome Back
            </h2>
            <form className="flex flex-col gap-y-5">
              <input
              name="email"
              onChange={handleChange}
                className="px-4 py-3 bg-zinc-900/50 text-white rounded-2xl border border-white/10 focus:border-lime-400 outline-none transition-all duration-300 focus:scale-[1.02] placeholder:text-white/40"
                type="email"
                placeholder="Your Email here"
              />
              <input
              name="password"
              onChange={handleChange}
                className="px-4 py-3 bg-zinc-900/50 text-white rounded-2xl border border-white/10 focus:border-lime-400 outline-none transition-all duration-300 focus:scale-[1.02] placeholder:text-white/40"
                type="password"
                placeholder="Your Password here"
              />

              <button
              onClick={handleSubmit}
                type="submit"
                disabled={apiCalled}
                className="mt-3 bg-gradient-to-r from-lime-400 to-green-500 text-black font-semibold py-3 rounded-2xl hover:shadow-[0_0_20px_rgba(163,230,53,0.6)] transition-all duration-300 hover:scale-[1.03]"
              >
                Log In
              </button>
            </form>
            <p className="text-center text-white/50 text-sm">
              Don’t have an account?{" "}
              <span onClick={() => navigate('/signup')} className="text-lime-400 cursor-pointer hover:underline">
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-[40%] h-full bg-[url(https://i.pinimg.com/736x/b4/57/a0/b457a0b46b8a3064fc6e9b2147681ac0.jpg)] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
    </div>
  );
}

export default Login;