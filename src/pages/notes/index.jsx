import { useEffect, useState } from "react";
import Navbar from "../../features/notes/components/Navbar";
import NoteList from "../../features/notes/components/NoteList";
import NotesListItem from "../../features/notes/components/NotesListItem";
import Sidebar from "../../features/notes/components/Sidebar";
import "./notes.css";

function NotesPage() {
  const [display, setDisplay] = useState(null);
  const [data, setData] = useState([
    { id: "1", name: "myname", details: "hello", tags: "ok" },
  ]);
  const [deletedNotes, setDeletedNoted] = useState([
    { id: "1", name: "deletedNote" },
  ]);
  const [notes, setNotes] = useState(data);
  const [archivedNotes, setArchivedNotes] = useState([
    { id: "1", name: "ArchiveNote" },
  ]);

  //  delete
  const deleteNote = (noteToDelete) => {
    setNotes((prev) => prev.filter((item) => item.id !== noteToDelete.id));
    setData((prev) => prev.filter((item) => item.id !== noteToDelete.id));
    setDisplay(null); // optional
  };

  // add button
  useEffect(() => {
    setNotes(data);
  }, [data]);

  return (
    <main className="notes">
      <Sidebar
        data={data}
        setData={setData}
        notes={notes}
        SetNotes={setNotes}
        deletedNotes={deletedNotes}
        archivedNotes={archivedNotes}
      />
      <section className="notes-content-area">
        <Navbar />
        <section className="notes-container">
          <NoteList
            display={display}
            data={data}
            setData={setData}
            notes={notes}
            setDeletedNoted={setDeletedNoted}
            setDisplay={setDisplay}
            deletedNotes={deletedNotes}
            setArchivedNotes={setArchivedNotes}
          />
          <section className="note-list-item">
            <NotesListItem
              display={display}
              setDisplay={setDisplay}
              deleteNote={deleteNote}
            />
          </section>
        </section>
      </section>
    </main>
  );
}

export default NotesPage;
