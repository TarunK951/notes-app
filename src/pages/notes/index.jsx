import { useState } from "react";
import Navbar from "../../features/notes/components/Navbar";
import NoteList from "../../features/notes/components/NoteList";
import NotesListItem from "../../features/notes/components/NotesListItem";
import Sidebar from "../../features/notes/components/Sidebar";
import "./notes.css";

function NotesPage() {
  const [display, setDisplay] = useState(null);
  const [allNotes, setAllNotes] = useState([
    { id: "1", name: "myname", details: "hello", tags: "ok" },
  ]);
  const [deletedNotes, setDeletedNotes] = useState([
    { id: "0020", name: "deleted" },
  ]);
  const [archivedNotes, setArchivedNotes] = useState([
    { id: "0050", name: "archived" },
  ]);
  const [completedNotes, setCompletedNotes] = useState([
    { id: "0090", name: "completed" },
  ]);

  const [view, setView] = useState("all");

  // delete..........
  const deleteNote = (noteToDelete) => {
    setAllNotes((prev) => prev.filter((item) => item.id !== noteToDelete.id));
    setArchivedNotes((prev) =>
      prev.filter((item) => item.id !== noteToDelete.id)
    );
    setCompletedNotes((prev) =>
      prev.filter((item) => item.id !== noteToDelete.id)
    );
    setDisplay(null);
    setDeletedNotes((prev) => [...prev, noteToDelete]);
    console.log("allnotes", allNotes);
    console.log("archived", archivedNotes);
    console.log("deleted", deletedNotes);
  };

  // archive ...........
  const archive = (note) => {
    setAllNotes((prev) => prev.filter((item) => item.id !== note.id));
    setArchivedNotes((prev) => [...prev, note]);
    setDisplay(null);
    console.log("allnotes", allNotes);
    console.log("archived", archivedNotes);
    console.log("deleted", deletedNotes);
  };

  // Mark note as completed.............
  const completeNote = (note) => {
    setAllNotes((prev) => prev.filter((item) => item.id !== note.id));
    setCompletedNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  // Undo completed ..............
  const undoComplete = (note) => {
    setCompletedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setAllNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  // Recover  .............
  const recoverNote = (note) => {
    setDeletedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setAllNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  // Erase ...............
  const eraseNote = (note) => {
    setDeletedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setDisplay(null);
  };

  // Unarchive......
  const unArchive = (note) => {
    setArchivedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setAllNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  // Get current list based on view
  const getCurrentNotes = () => {
    switch (view) {
      case "archived":
        return archivedNotes;
      case "deleted":
        return deletedNotes;
      case "completed":
        return completedNotes;

      default:
        return allNotes;
    }
  };

  return (
    <main className="notes">
      <Sidebar setView={setView} />
      <section className="notes-content-area">
        <Navbar />
        <section className="notes-container">
          <NoteList
            display={display}
            allNotes={getCurrentNotes()}
            setAllNotes={setAllNotes}
            setDisplay={setDisplay}
          />
          <section className="note-list-item">
            <NotesListItem
              display={display}
              setDisplay={setDisplay}
              deleteNote={deleteNote}
              view={view}
              completeNote={completeNote}
              undoComplete={undoComplete}
              unArchive={unArchive}
              archive={archive}
              recoverNote={recoverNote}
              eraseNote={eraseNote}
            />
          </section>
        </section>
      </section>
    </main>
  );
}

export default NotesPage;
