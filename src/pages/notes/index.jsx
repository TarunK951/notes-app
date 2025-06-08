//
import Navbar from "../../features/notes/components/Navbar";
import NoteList from "../../features/notes/components/NoteList";
import NotesListItem from "../../features/notes/components/NotesListItem";
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
          <section className="note-list-item">
            <NotesListItem />
          </section>
        </section>
      </section>
    </main>
  );
}

export default NotesPage;
