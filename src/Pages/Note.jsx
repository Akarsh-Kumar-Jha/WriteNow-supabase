import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import supabase from "../supabaseConnection";
import { debounce } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from "sonner";
import Markdown from 'react-markdown'

function Note() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [changesMade, setChangesMade] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const contentRef = useRef(null);

  useEffect(() => {
    async function fetchNote() {
      const { data, error } = await supabase.from("Notes").select().eq("id", id);
      if (error) {
        console.error("Error fetching note:", error.message);
        return;
      }
      if (data?.[0]) {
        setHeading(data[0].Heading);
        setContent(data[0].Content);
      }
    }
    fetchNote();
  }, [id]);


const deleteNote = async(noteId) => {
   if (confirm("Are You Confirm!")) {
console.log('Delete Note:',noteId);
console.log('Delete Note:',noteId);
const response = await supabase.from('Notes').delete().eq('id',noteId);
toast.success('Note Deleted',{
  duration:3000
});
navigate('/');
   }
}


  const saveToDb = useCallback(
    debounce(async (heading, content, userId) => {
      const { error } = await supabase
        .from("Notes")
        .upsert({ id, Heading: heading, Content: content, user: userId });
      if (error) {
        console.error("Error saving note:", error.message);
        return;
      }
      setLastSaved(new Date());
      setChangesMade(false);
    }, 1200),
    [id]
  );

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  useEffect(() => {
    if (changesMade) {
      saveToDb(heading, content, user?.id);
    }
  }, [heading, content, changesMade, user, saveToDb]);

  const handleHeadingKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      contentRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-[#1a1a1a] text-gray-200 flex justify-center px-8 py-14 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
           <div
   className="absolute inset-0 z-0"
   style={{
     backgroundColor: '#0a0a0a',
     backgroundImage: `
       radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
       radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
     `,
     backgroundSize: '10px 10px',
     imageRendering: 'pixelated',
   }}
 />
       <AiOutlineDelete onClick={() => deleteNote(id)} className="absolute top-10 right-5 cursor-pointer text-lg md:text-2xl text-white hover:text-red-400" />
<FaArrowAltCircleLeft onClick={() => navigate('/')} className="absolute top-10 left-5 text-2xl md:text-4xl cursor-pointer"/>
      <div className="w-full max-w-3xl z-10">
        
        {/* Save status */}
        <div className="text-xs text-gray-500 mb-6 mt-5 text-right italic">
          {changesMade
            ? "Saving..."
            : lastSaved
            ? `Saved at ${lastSaved.toLocaleTimeString()}`
            : "All changes saved"}
        </div>

        {/* Title (inline editable like Notion heading) */}
        <input
          value={heading}
          onChange={(e) => {
            setHeading(e.target.value);
            setChangesMade(true);
          }}
          onKeyDown={handleHeadingKeyDown}
          className="w-full bg-transparent text-5xl font-bold mb-8 outline-none border-none placeholder-gray-600 focus:border-b-2 focus:border-indigo-500 focus:pb-1 transition-all duration-200 caret-indigo-400"
          placeholder="Untitled"
          type="text"
        />

        {/* Content */}
        <textarea
          ref={contentRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setChangesMade(true);
          }}
          className="w-full bg-transparent outline-none border-none placeholder-gray-600 text-lg leading-relaxed resize-none overflow-hidden transition-all duration-200 caret-indigo-400 focus:pl-2 focus:border-l-2 focus:border-indigo-500 focus:ml-[-2px]"
          placeholder="Type Your Note here..."
        ></textarea>
      </div>
    </div>
  );
}

export default Note;
