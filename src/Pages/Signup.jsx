import React, { useState } from "react";
import supabase from "../supabaseConnection";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Signup() {

const [inputData,setInputData] = useState({
    name:'',
    email:'',
    password:''
});
const [apiCalled,setApicalled] = useState(false);
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
setApicalled(true);
if(!inputData.name || !inputData.email || !inputData.password){
    toast.error('Give All Details',{
        duration:3000,
        position:"top-left",
        background: 'red'
    });
    setApicalled(false);
    return;
}


console.log("Data -> ",inputData);
const {email,password,name} = inputData;
const avatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?seed=${name}`
const {data,error} = await supabase.auth.signUp({
    email,
    password,
    options:{
        data:{
            name,
            avatarUrl
        }
    }
});
if(error){
    console.error('Error Occuered While Signup ',error.message);
    setApicalled(false);
    return;
}

console.log("Data After Sigup -> ",data);
setApicalled(false);
toast.success('Check your inbox! Confirm your email to get started.',{
          duration: 5000,
        });

        setInputData({
    name:'',
    email:'',
    password:''
});



    }
  return (
    <div className="h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black flex justify-center items-center">
      <div className="h-[80%] w-[90%] max-w-5xl bg-zinc-800/60 backdrop-blur-2xl rounded-3xl shadow-xl shadow-blue-500/20 flex overflow-hidden">
        
        {/* Left Section - Form */}
        <div className="w-[60%] h-full flex justify-center items-center">
          <div className="w-[80%] max-w-md flex flex-col gap-y-8">
            <h2 className="text-4xl font-bold text-white text-center drop-shadow-lg">
              Create Account
            </h2>
            <form className="flex flex-col gap-y-5">
              <input
              name="name"
              value={inputData.name}
              onChange={handleChange}
                className="px-4 py-3 bg-zinc-900/50 text-white rounded-2xl border border-white/10 focus:border-lime-400 outline-none transition-all duration-300 focus:scale-[1.02] placeholder:text-white/40"
                type="text"
                placeholder="Your Name here"
              />
              <input
              name="email"
              value={inputData.email}
              onChange={handleChange}
                className="px-4 py-3 bg-zinc-900/50 text-white rounded-2xl border border-white/10 focus:border-lime-400 outline-none transition-all duration-300 focus:scale-[1.02] placeholder:text-white/40"
                type="email"
                placeholder="Your Email here"
              />
              <input
              name="password"
              value={inputData.password}
              onChange={handleChange}
                className="px-4 py-3 bg-zinc-900/50 text-white rounded-2xl border border-white/10 focus:border-lime-400 outline-none transition-all duration-300 focus:scale-[1.02] placeholder:text-white/40"
                type="password"
                placeholder="Your Password here"
              />

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={apiCalled}
                className="mt-3 bg-gradient-to-r from-lime-400 to-green-500 text-black font-semibold py-3 rounded-2xl hover:shadow-[0_0_20px_rgba(163,230,53,0.6)] transition-all duration-300 hover:scale-[1.03]"
              >
                {apiCalled ? 'Siging Up...':'Sign Up'}
              </button>
            </form>
            <p className="text-center text-white/50 text-sm">
              Already have an account?{" "}
              <span onClick={() => navigate('/login')} className="text-lime-400 cursor-pointer hover:underline">
                Log In
              </span>
            </p>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-[40%] h-full bg-[url(https://i.pinimg.com/736x/45/3b/1d/453b1d544328a8617bd6f515d977e7b1.jpg)] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
    </div>
  );
}

export default Signup;