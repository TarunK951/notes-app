import { useState } from "react";
import { GrNotes } from "react-icons/gr";
import { IoArchive } from "react-icons/io5";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../../../styles/sidebar.css";

function Sidebar({ setView }) {
  const [selected, setSelected] = useState(0); // Default to first button

  const selectBtn = (index, view) => {
    setSelected(index);
    setView(view);
  };

  return (
    <aside className="notes-sidebar">
      <div className="logo-container">
        <GrNotes height={30} width={40} />
        <h2>Notes</h2>
      </div>
      <div className="sidebar-options">
        <button
          className={`sidebar-btn ${selected === 0 ? "selected" : ""}`}
          onClick={() => selectBtn(0, "all")}
        >
          <MdOutlineSpeakerNotes />
          All Notes
        </button>
        <button
          className={`sidebar-btn ${selected === 1 ? "selected" : ""}`}
          onClick={() => selectBtn(1, "completed")}
        >
          Completed Tasks
        </button>
        <button
          className={`sidebar-btn ${selected === 2 ? "selected" : ""}`}
          onClick={() => selectBtn(2, "archived")}
        >
          <IoArchive />
          Archive Notes
        </button>
        <button
          className={`sidebar-btn ${selected === 3 ? "selected" : ""}`}
          onClick={() => selectBtn(3, "deleted")}
        >
          <RiDeleteBin6Line />
          Recycle Bin
        </button>
      </div>
      <div className="sidebar-tags">{/* <p>Work</p> */}</div>
    </aside>
  );
}

export default Sidebar;
