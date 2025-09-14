import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteData from "../components/NoteData";
import supabase from "../supabaseConnection";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Home() {

const contextData = useContext(AuthContext);
  const navigate = useNavigate();
  const [Notes,setNotes] = useState([]);


  console.log("AuthContextData -> ",contextData);

  useEffect(() => {

if(contextData.user === null){
  if(contextData.loading === false){
navigate('/login');
  }
}


  });

  useEffect(() => {
async function getNotes(){
const { data, error } = await supabase.auth.getSession();
if(error){
  console.error('Error While Fetching Notes',error.message);
  return;
}
const {data:result,error:notesError} = await supabase.from('Notes').select().eq('user',data?.session?.user?.id);
if(notesError){
    console.error('Error While Fetching Notes',error.message);
  return;
}
console.log('Data For Notes = ',result);
setNotes(result);
}
getNotes();
  },[]);



  return (
    <div className="min-h-screen w-full bg-zinc-900 flex flex-col justify-betwwen items-center relative">
      <Navbar />
      <NoteData Notes={Notes} />

      <div className="mt-10 w-[88%] flex flex-col justify-center items-center gap-y-6">
  <div className="h-[2px] w-full bg-gradient-to-r from-lime-400/80 via-lime-300/50 to-lime-400/80 rounded-xl"></div>

  {/* Notes Grid */}
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
    {
    Notes?.map((note, index) => (
      <div
        key={index}
        onClick={() => navigate(`/note/${note?.id}`)}
        className="rounded-2xl cursor-pointer border border-white/10 bg-white/5 backdrop-blur-lg h-[180px] w-[250px] flex flex-col justify-evenly items-center p-4 shadow-lg shadow-lime-400/10 hover:shadow-lime-400/30 hover:scale-105 transition-all duration-300"
      >
        <h2 className="text-lg font-semibold text-lime-300 text-center tracking-wide">
          {note.Heading}
        </h2>
        <p className="text-sm text-gray-300 text-center line-clamp-3">
          {note.Content.substring(0,80)}...
        </p>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}

export default Home;
