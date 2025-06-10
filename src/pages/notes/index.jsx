//
import { useState } from "react";
import Navbar from "../../features/notes/components/Navbar";
import NoteList from "../../features/notes/components/NoteList";
import NotesListItem from "../../features/notes/components/NotesListItem";
import Sidebar from "../../features/notes/components/Sidebar";
import "./notes.css";

function NotesPage() {
  const [display, setDisplay] = useState(null);

  return (
    <main className="notes">
      <Sidebar />
      <section className="notes-content-area">
        <Navbar />
        <section className="notes-container">
          <NoteList display={display} setDisplay={setDisplay} />
          <section className="note-list-item">
            <NotesListItem display={display} setDisplay={setDisplay} />
          </section>
        </section>
      </section>
    </main>
  );
}

export default NotesPage;
