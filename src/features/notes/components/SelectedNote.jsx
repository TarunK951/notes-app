import "../../../styles/selectedNotes.css";

function SelectedNote({ display, setDisplay }) {
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
          <div className="note-item">
            <span className="note-label">Name:</span>
            <span className="note-value">{display.name || "No name"}</span>
          </div>
          <div className="note-item">
            <span className="note-label">Tags:</span>
            <span className="note-value">{display.tags || "No tags"}</span>
          </div>
          <div className="note-item-details">
            <span className="note-label">Details:</span>
            <span className="note-value">
              {display.details || "No details"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedNote;
