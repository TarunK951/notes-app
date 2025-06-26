import { useEffect, useState } from "react";
import "../../../styles/selectedNotes.css";

function SelectedNote({ display, setDisplay, allNotes, setAllNotes }) {
  const [editMode, setEditMode] = useState(false);
  const [editedNote, setEditedNote] = useState(display);

  useEffect(() => {
    setEditedNote(display);
  }, [display]);

  if (!display || !allNotes) return null;

  const currentIndex = allNotes.findIndex((item) => item.id === display.id);

  const updateNote = () => {
    if (!editedNote) return;
    setAllNotes((prev) =>
      prev.map((item) => (item.id === editedNote.id ? { ...editedNote } : item))
    );
    setDisplay({ ...editedNote });
    setEditMode(false);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDisplay(allNotes[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < allNotes.length - 1) {
      setDisplay(allNotes[currentIndex + 1]);
    }
  };

  const handleChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  const renderNoteItem = (label, key) => (
    <div className="note-item">
      <span className="note-label">{label}</span>
      {editMode ? (
        <input
          className="note-value editable-input"
          name={key}
          value={editedNote[key] || ""}
          onChange={handleChange}
        />
      ) : (
        <span className="note-value">
          {display[key] || `No ${label.toLowerCase()}`}
        </span>
      )}
    </div>
  );

  return (
    <div className="selected-note">
      <div className="note-header">
        <button className="close-btn" onClick={() => setDisplay(null)}>
          ×
        </button>
      </div>
      <div className="note-content">
        <h3 className="note-title">Selected Note</h3>
        <div className="note-details">
          {renderNoteItem("Name:", "name")}
          {renderNoteItem("Tags:", "tags")}
          {renderNoteItem("Priority:", "priority")}
          {renderNoteItem("Assigned To:", "assignedTo")}
          {renderNoteItem("Location:", "location")}
          <div className="note-item-details">
            <span className="note-label">Details:</span>
            {editMode ? (
              <textarea
                name="details"
                value={editedNote.details || ""}
                onChange={handleChange}
                className="note-value editable-input"
                rows={5}
              />
            ) : (
              <span className="note-value">
                {display.details || "No details"}
              </span>
            )}
          </div>
        </div>
        <div className="note-actions">
          {editMode ? (
            <button className="action-btn save-btn" onClick={updateNote}>
              Save
            </button>
          ) : (
            <button
              className="action-btn edit-btn"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          )}

          {currentIndex > 0 && (
            <button className="action-btn prev-btn" onClick={goToPrevious}>
              <span className="mobile-arrow">&lt;</span>
              <span className="desktop-label">Previous</span>
            </button>
          )}

          {currentIndex < allNotes.length - 1 && (
            <button className="action-btn next-btn" onClick={goToNext}>
              <span className="desktop-label">Next</span>
              <span className="mobile-arrow">&gt;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectedNote;
