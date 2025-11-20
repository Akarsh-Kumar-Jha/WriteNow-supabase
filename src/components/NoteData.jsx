import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NoteData({Notes}) {
  const navigate = useNavigate();
   const {user} = useContext(AuthContext);
   const Noteid = 100*(Math.floor(Math.random()*10 + 1))+(Math.floor(Math.random()*10 + 1));
  return (
    <div className="w-[88%] h-[10%] mt-[17vh] flex flex-row justify-between items-center gap-x-7">
      {/* Add Note Button */}
      <button
         onClick={() => navigate(`/note/${Noteid}`)}
        className="px-4 py-2 z-10 rounded-xl bg-gradient-to-r from-lime-400 to-green-600 text-black font-semibold shadow-lg hover:scale-105 hover:shadow-lime-400/40 transition-all duration-300"
      >
        + Add Note
      </button>

      {/* Card */}
      <div className="rounded-2xl bg-gray-900/80 backdrop-blur-md border border-gray-700 h-[100%] flex-1 flex flex-col justify-center items-center shadow-lg p-4">
        <h3 className="text-sm md:text-lg text-gray-300 font-semibold md:font-medium mb-2">
          Welcome, <span className="text-lime-400 font-semibold">{user?.user_metadata?.name}</span>
        </h3>

        {Notes.length === 0 ? (
          <h3 className="text-lg md:text-xl text-red-400 font-semibold animate-pulse">
            No Notes Found 😒
          </h3>
        ) : (
          <div className="text-center">
            <h3 className="text-lg md:text-2xl text-gray-200 font-semibold tracking-wide">
              Total Notes
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-lime-400 drop-shadow-lg">
              {Notes.length}
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default NoteData;
