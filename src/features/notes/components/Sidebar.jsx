import { useState } from "react";
import { GrNotes } from "react-icons/gr";
import { IoArchive } from "react-icons/io5";
import { MdOutlineSpeaker } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../../../styles/sidebar.css";

function Sidebar({
  setView,
  tagOptions,
  priorityOptions,
  setSelectedTag,
  setSelectedPriority,
  isSidebarOpen,
  isFilterOpen,
  closeSidebar,
}) {
  const [selected, setSelected] = useState(null);
  const [selectedTagIndex, setSelectedTagIndex] = useState(null);
  const [selectedPriorityIndex, setSelectedPriorityIndex] = useState(null);

  const selectBtn = (index, view) => {
    setSelected(index);
    setView(view);
    setSelectedTag(null);
    setSelectedPriority(null);
    setSelectedTagIndex(null);
    setSelectedPriorityIndex(null);
    if (window.innerWidth <= 600) closeSidebar();
  };

  const selectTag = (tag, index) => {
    setSelectedTag(tag);
    setSelectedTagIndex(index);
  };

  const selectPriority = (priority, index) => {
    setSelectedPriority(priority);
    setSelectedPriorityIndex(index);
  };

  const resetTagFilter = () => {
    setSelectedTag(null);
    setSelectedTagIndex(null);
  };

  const resetPriorityFilter = () => {
    setSelectedPriority(null);
    setSelectedPriorityIndex(null);
  };

  return (
    <div className="sidebar">
      <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
        <aside className="notes-sidebar">
          <div className="logo-container">
            <GrNotes />
            <h2>Notes</h2>
          </div>
          <div className="sidebar-options">
            <button
              className={`sidebar-btn ${selected === 0 ? "selected" : ""}`}
              onClick={() => selectBtn(0, "all")}
            >
              <MdOutlineSpeaker />
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
      </div>

      <div className={`filter-wrapper ${isFilterOpen ? "open" : ""}`}>
        <aside className="filter-panel">
          <div className="tags-container">
            <h2 className="tags-title">Tags</h2>
            <div className="tag-names">
              <button
                className={`tag-btn ${
                  selectedTagIndex === null ? "selected" : ""
                }`}
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
          </div>

          <div className="priority-container">
            <h2 className="priority-title">Priority</h2>
            <div className="priority-names">
              <button
                className={`priority-btn ${
                  selectedPriorityIndex === null ? "selected" : ""
                }`}
                onClick={resetPriorityFilter}
              >
                All
              </button>
              {priorityOptions.map((priority, index) => (
                <button
                  key={priority}
                  className={`priority-btn ${
                    selectedPriorityIndex === index ? "selected" : ""
                  }`}
                  onClick={() => selectPriority(priority, index)}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Sidebar;
