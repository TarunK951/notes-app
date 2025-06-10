import "../../../styles/noteListItem.css";
import NoteActions from "./NoteActions";
import SelectedNote from "./SelectedNote";

function NotesListItem({ display, setDisplay }) {
  if (!display) {
    return <div className="selected-note">No note selected note</div>;
  }
  return (
    <div>
      <div className="container">
        <SelectedNote display={display} setDisplay={setDisplay} />
        <NoteActions />
      </div>
    </div>
  );
}

export default NotesListItem;
