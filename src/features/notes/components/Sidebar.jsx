import { useState } from "react";
import { GrNotes } from "react-icons/gr";
import { IoArchive } from "react-icons/io5";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../../../styles/sidebar.css";

function Sidebar({ setView, tagOptions, setSelectedTag }) {
  const [selected, setSelected] = useState(0); // For view buttons (all, completed, etc.)
  const [selectedTagIndex, setSelectedTagIndex] = useState(null); // For tag buttons

  const selectBtn = (index, view) => {
    setSelected(index);
    setView(view);
    setSelectedTag(null); // Reset tag filter when changing view
    setSelectedTagIndex(null);
  };

  const selectTag = (tag, index) => {
    setSelectedTag(tag);
    setSelectedTagIndex(index);
  };

  const resetTagFilter = () => {
    setSelectedTag(null);
    setSelectedTagIndex(null);
  };

  return (
    <div>
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
      </aside>

      <aside className="tags-container">
        <h2 className="tags-title">Tags</h2>
        <div className="tag-names">
          <button
            className={`tag-btn ${selectedTagIndex === null ? "selected" : ""}`}
            onClick={resetTagFilter}
          >
            All
          </button>
          {tagOptions.map((tag, index) => (
            <button
              key={tag}
              className={`tag-btn ${
                selectedTagIndex === index ? "selected" : ""
              }`}
              onClick={() => selectTag(tag, index)}
            >
              {tag}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
