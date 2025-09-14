import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import supabase from "../supabaseConnection";
import { debounce } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

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

  const deleteNote = async (noteId) => {
    if (confirm("Are you sure you want to delete this note?")) {
      await supabase.from("Notes").delete().eq("id", noteId);
      toast.success("Note Deleted", { duration: 3000 });
      navigate("/");
    }
  };

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
    <div className="min-h-screen w-full relative bg-[#1a1a1a] text-gray-200 flex justify-center px-4 sm:px-8 py-10 sm:py-14 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Icons */}
      <AiOutlineDelete
        onClick={() => deleteNote(id)}
        className="absolute top-4 right-4 sm:top-10 sm:right-6 cursor-pointer text-xl sm:text-2xl text-white hover:text-red-400"
      />
      <FaArrowAltCircleLeft
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 sm:top-10 sm:left-6 text-2xl sm:text-4xl cursor-pointer hover:text-indigo-400"
      />

      <div className="w-full max-w-3xl">
        {/* Save status */}
        <div className="text-xs text-gray-500 mb-6 mt-8 sm:mt-5 text-right italic">
          {changesMade
            ? "Saving..."
            : lastSaved
            ? `Saved at ${lastSaved.toLocaleTimeString()}`
            : "All changes saved"}
        </div>

        {/* Title */}
        <input
          value={heading}
          onChange={(e) => {
            setHeading(e.target.value);
            setChangesMade(true);
          }}
          onKeyDown={handleHeadingKeyDown}
          className="w-full bg-transparent text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 outline-none border-none placeholder-gray-600 focus:border-b-2 focus:border-indigo-500 focus:pb-1 transition-all duration-200 caret-indigo-400"
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
          className="w-full bg-transparent outline-none border-none placeholder-gray-600 text-base sm:text-lg leading-relaxed resize-none overflow-hidden transition-all duration-200 caret-indigo-400 focus:pl-2 focus:border-l-2 focus:border-indigo-500 focus:ml-[-2px] min-h-[60vh]"
          placeholder="Type your note here..."
        ></textarea>
      </div>
    </div>
  );
}

export default Note;