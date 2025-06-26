import { useEffect, useRef, useState } from "react";
import { FaPen, FaTimes } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import "../../../styles/noteList.css";

function NoteList({
  setDisplay,
  setAllNotes,
  allNotes,
  selectedTag,
  selectedPriority,
  searchQuery,
  closeSidebar,
}) {
  const tagOptions = ["a", "b", "c", "d", "e", "f", "g"];
  const priorityLevels = [
    { label: "High", value: "high", color: "#FF6B6B" },
    { label: "Medium", value: "medium", color: "#FFA500" },
    { label: "Low", value: "low", color: "#2ECC71" },
    { label: "Casual", value: "casual", color: "#A0A0A0" },
  ];

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");
  const [pri, setPri] = useState("casual");
  const [location, setLocation] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    const startDrag = (x, y) => {
      const rect = button.getBoundingClientRect();
      offsetX = x - rect.left;
      offsetY = y - rect.top;
      isDragging = true;
      button.style.transition = "none";
    };

    const onMove = (x, y) => {
      if (!isDragging) return;
      const newX = Math.max(0, Math.min(window.innerWidth - 56, x - offsetX));
      const newY = Math.max(0, Math.min(window.innerHeight - 56, y - offsetY));
      button.style.left = `${newX}px`;
      button.style.top = `${newY}px`;
    };

    const stopDrag = () => {
      isDragging = false;
      button.style.transition = "all 0.2s ease";
    };

    const handleMouseDown = (e) => startDrag(e.clientX, e.clientY);
    const handleMouseMove = (e) => onMove(e.clientX, e.clientY);
    const handleMouseUp = () => stopDrag();

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    };
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      onMove(touch.clientX, touch.clientY);
    };
    const handleTouchEnd = () => stopDrag();

    button.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    button.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      button.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      button.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const addNewItem = (e) => {
    e.preventDefault();
    if (!name.trim() && !tags && !details.trim()) return;

    const newNote = {
      id: Date.now(),
      name: name.trim() || "Unknown",
      date,
      details,
      tags,
      priority: pri,
      location,
      assignedTo,
    };

    setAllNotes((prev) => [...prev, newNote]);
    setDisplay(newNote);

    setName("");
    setDetails("");
    setTags("");
    setPri("casual");
    setOpen(false);
    setDate("");
    setLocation("");
    setAssignedTo("");
  };

  const handleTagClick = (tag) => {
    setTags(tags === tag ? "" : tag);
  };

  const handleNoteClick = (item) => {
    setDisplay(item);
    if (window.innerWidth <= 600) closeSidebar();
  };

  const getNoNotesMessage = () => {
    let message = "No notes available";
    const filters = [];
    if (selectedTag) filters.push(`tag "${selectedTag}"`);
    if (selectedPriority) filters.push(`priority "${selectedPriority}"`);
    if (searchQuery.trim()) filters.push(`search "${searchQuery}"`);

    if (filters.length > 0) {
      message = `No notes match ${filters.join(" and ")}`;
    }

    return message;
  };

  return (
    <div className="notes-list">
      <div className="add-container">
        <button className="add-btn" onClick={() => setOpen(!open)}>
          Add <IoIosAdd />
        </button>
      </div>

      <div
        ref={buttonRef}
        className="floating-button"
        onClick={() => setOpen(!open)}
      >
        <FaPen />
      </div>

      {open && (
        <div className="input-pop">
          <button className="input-close-btn" onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
          <form onSubmit={addNewItem} className="input-form">
            <div className="inputs-labels">
              <label htmlFor="name">Name</label>
              <input
                className="input-area"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inputs-labels">
              <label>Tags</label>
              <div className="input-tags">
                {tagOptions.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`tag-button ${tags === tag ? "active-tag" : ""}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="inputs-labels">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="input-area"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="inputs-labels">
              <label>Priority</label>
              <div className="priority-options">
                {priorityLevels.map((level) => (
                  <label
                    key={level.value}
                    className="priority-label"
                    style={{
                      backgroundColor:
                        pri === level.value ? level.color : "var(--bg-primary)",
                      color:
                        pri === level.value ? "#FFFFFF" : "var(--text-primary)",
                    }}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={level.value}
                      checked={pri === level.value}
                      onChange={() => setPri(level.value)}
                    />
                    {level.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="inputs-labels">
              <label htmlFor="assignedTo">Assigned To</label>
              <input
                className="input-area"
                type="text"
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
            </div>

            <div className="inputs-labels">
              <label htmlFor="location">Location</label>
              <input
                className="input-area"
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="inputs-labels">
              <label htmlFor="details">Task</label>
              <textarea
                className="input-area"
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                placeholder="Enter more details..."
              />
            </div>

            <div className="submit">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="list-container">
        {allNotes.length === 0 ? (
          <p className="no-notes">{getNoNotesMessage()}</p>
        ) : (
          allNotes.map((item, index) => (
            <div
              className="list-details"
              key={item.id || index}
              onClick={() => handleNoteClick(item)}
            >
              <p className="note-name">{item.name}</p>
              <p
                className="note-priority"
                style={{
                  color: priorityLevels.find((l) => l.value === item.priority)
                    ?.color,
                }}
              >
                {item.priority}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NoteList;
