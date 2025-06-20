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
          <button onClick={() => archive(display)}>Archive</button>
          <button onClick={() => completeNote(display)}>Complete</button>
          <button onClick={() => deleteNote(display)}>Delete</button>
        </>
      )}
      {view === "archived" && (
        <>
          <button onClick={() => unArchive(display)}>Unarchive</button>
          <button onClick={() => deleteNote(display)}>Delete</button>
        </>
      )}
      {view === "deleted" && (
        <>
          <button onClick={() => recoverNote(display)}>Recover</button>
          <button onClick={() => eraseNote(display)}>Erase</button>
        </>
      )}
      {view === "completed" && (
        <>
          <button onClick={() => undoComplete(display)}>Undo</button>
          <button onClick={() => deleteNote(display)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default NoteActions;
