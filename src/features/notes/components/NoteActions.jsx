import "../../../styles/noteActions.css";

function NoteActions() {
  return (
    <div className="notes-actions">
      <button type="button" class="btn btn-outline-primary">
        Delete
      </button>
      <button>Archive</button>
    </div>
  );
}

export default NoteActions;
