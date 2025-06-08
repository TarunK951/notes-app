import "../../../styles/noteListItem.css";
import NoteActions from "./NoteActions";
import SelectedNote from "./SelectedNote";

function NotesListItem() {
  return (
    <div>
      <div className="container">
        <SelectedNote />
        <NoteActions />
      </div>
    </div>
  );
}

export default NotesListItem;
