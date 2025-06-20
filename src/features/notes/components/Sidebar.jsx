import { GrNotes } from "react-icons/gr";
import { IoArchive } from "react-icons/io5";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../../../styles/sidebar.css";

function Sidebar({ setView }) {
  return (
    <aside className="notes-sidebar">
      <div className="logo-container">
        <GrNotes height={30} width={40} />
        <h2> Notes</h2>
      </div>
      <div className="sidebar-options">
        <button className="sidebar-btn" onClick={() => setView("all")}>
          <MdOutlineSpeakerNotes />
          All Notes
        </button>
        <button className="sidebar-btn" onClick={() => setView("completed")}>
          Completed Tasks
        </button>

        <button className="sidebar-btn" onClick={() => setView("archived")}>
          <IoArchive />
          Archive Notes
        </button>
        <button className="sidebar-btn" onClick={() => setView("deleted")}>
          <RiDeleteBin6Line /> Recycle Bin
        </button>
      </div>
      <div className="sidebar-tags">{/* <p>Work</p> */}</div>
    </aside>
  );
}

export default Sidebar;
