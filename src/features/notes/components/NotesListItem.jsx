import "../../../styles/noteListItem.css";
import NoteActions from "./NoteActions";
import SelectedNote from "./SelectedNote";

function NotesListItem({
  allNotes,
  setAllNotes,
  display,
  setDisplay,
  deleteNote,
  archive,
  completeNote,
  unArchive,
  recoverNote,
  eraseNote,
  undoComplete,
  view,
}) {
  if (!display) {
    return <div className="selected-note">No note selected note</div>;
  }
  return (
    <div>
      <div className="container">
        <SelectedNote
          allNotes={allNotes}
          setAllNotes={setAllNotes}
          display={display}
          setDisplay={setDisplay}
        />
        <NoteActions
          display={display}
          view={view}
          deleteNote={deleteNote}
          completeNote={completeNote}
          undoComplete={undoComplete}
          unArchive={unArchive}
          archive={archive}
          recoverNote={recoverNote}
          eraseNote={eraseNote}
        />
      </div>
    </div>
  );
}

export default NotesListItem;
