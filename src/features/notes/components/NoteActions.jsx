import "../../../styles/noteActions.css";

function NoteActions({
  display,
  view,
  archive,
  deleteNote,
  unArchive,
  eraseNote,
  recoverNote,
  completeNote,
  undoComplete,
}) {
  if (!display) return null;

  return (
    <div className="notes-actions">
      {view === "all" && (
        <>
          <button onClick={() => archive(display)} className="action-btn">
            Archive
          </button>
          <button onClick={() => completeNote(display)} className="action-btn">
            Complete
          </button>
          <button onClick={() => deleteNote(display)} className="action-btn">
            Delete
          </button>
        </>
      )}
      {view === "archived" && (
        <>
          <button onClick={() => unArchive(display)} className="action-btn">
            Unarchive
          </button>
          <button onClick={() => deleteNote(display)} className="action-btn">
            Delete
          </button>
        </>
      )}
      {view === "deleted" && (
        <>
          <button onClick={() => recoverNote(display)} className="action-btn">
            Recover
          </button>
          <button onClick={() => eraseNote(display)} className="action-btn">
            Erase
          </button>
        </>
      )}
      {view === "completed" && (
        <>
          <button onClick={() => undoComplete(display)} className="action-btn">
            Undo
          </button>
          <button onClick={() => deleteNote(display)} className="action-btn">
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default NoteActions;
