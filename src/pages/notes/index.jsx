//
import Navbar from "../../features/notes/components/Navbar";
import NoteActions from "../../features/notes/components/NoteActions";
import NoteList from "../../features/notes/components/NoteList";
import SelectedNote from "../../features/notes/components/SelectedNote";
import Sidebar from "../../features/notes/components/Sidebar";
import "./notes.css";

function NotesPage() {
  return (
    <main className="notes">
      <Sidebar />
      <section className="notes-content-area">
        <Navbar />
        <section className="notes-container">
          <NoteList />
          <SelectedNote />
          <NoteActions />
        </section>
      </section>
    </main>
  );
}

export default NotesPage;
