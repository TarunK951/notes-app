import "../../../styles/noteActions.css";

function NoteActions({ deleteNote, display }) {
  return (
    <div className="notes-actions">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => deleteNote(display)}
      >
        Delete
      </button>
      <button>Archive</button>
    </div>
  );
}

export default NoteActions;
