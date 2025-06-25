import { useEffect, useState } from "react";
import Navbar from "../../features/notes/components/Navbar";
import NoteList from "../../features/notes/components/NoteList";
import NotesListItem from "../../features/notes/components/NotesListItem";
import Sidebar from "../../features/notes/components/Sidebar";
import "./notes.css";

function NotesPage() {
  const [display, setDisplay] = useState(null);
  const [allNotes, setAllNotes] = useState([
    { id: "1", name: "myname", details: "hello", tags: "a" },
  ]);
  const [deletedNotes, setDeletedNotes] = useState([
    { id: "0020", name: "deleted", tags: "b" },
  ]);
  const [archivedNotes, setArchivedNotes] = useState([
    { id: "0050", name: "archived", tags: "c" },
  ]);
  const [completedNotes, setCompletedNotes] = useState([
    { id: "0090", name: "completed", tags: "d" },
  ]);
  const [view, setView] = useState("all");
  const [selectedTag, setSelectedTag] = useState(null); // Track selected tag

  // Debug state changes
  useEffect(() => {
    console.log("allNotes:", allNotes);
    console.log("archivedNotes:", archivedNotes);
    console.log("deletedNotes:", deletedNotes);
    console.log("selectedTag:", selectedTag);
  }, [allNotes, archivedNotes, deletedNotes, selectedTag]);

  // Tag options (consistent with NoteList)
  const tagOptions = ["a", "b", "c", "d", "e", "f", "g"];

  // Delete note
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
  };

  // Archive note
  const archive = (note) => {
    setAllNotes((prev) => prev.filter((item) => item.id !== note.id));
    setArchivedNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  // Mark note as completed
  const completeNote = (note) => {
    setAllNotes((prev) => prev.filter((item) => item.id !== note.id));
    setCompletedNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  // Undo completed
  const undoComplete = (note) => {
    setCompletedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setAllNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  // Recover note
  const recoverNote = (note) => {
    setDeletedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setAllNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  // Erase note
  const eraseNote = (note) => {
    setDeletedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setDisplay(null);
  };

  // Unarchive note
  const unArchive = (note) => {
    setArchivedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setAllNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  // Get current notes based on view and selected tag
  const getCurrentNotes = () => {
    let notes;
    switch (view) {
      case "archived":
        notes = archivedNotes;
        break;
      case "deleted":
        notes = deletedNotes;
        break;
      case "completed":
        notes = completedNotes;
        break;
      default:
        notes = allNotes;
    }

    // Apply tag filter if selectedTag is set
    if (selectedTag) {
      return notes.filter((note) => note.tags === selectedTag);
    }
    return notes;
  };

  return (
    <main className="notes">
      <Sidebar
        setView={setView}
        tagOptions={tagOptions}
        setSelectedTag={setSelectedTag}
      />
      <section className="notes-content-area">
        <Navbar />
        <section className="notes-container">
          <NoteList
            display={display}
            allNotes={getCurrentNotes()}
            setAllNotes={setAllNotes}
            setDisplay={setDisplay}
            selectedTag={selectedTag}
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
