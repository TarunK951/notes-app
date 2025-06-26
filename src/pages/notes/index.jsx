import { useEffect, useState } from "react";
import Navbar from "../../features/notes/components/Navbar";
import NoteList from "../../features/notes/components/NoteList";
import NotesListItem from "../../features/notes/components/NotesListItem";
import Sidebar from "../../features/notes/components/Sidebar";
import "./notes.css";

function NotesPage() {
  const [display, setDisplay] = useState(null);
  const [allNotes, setAllNotes] = useState(() => {
    const saved = localStorage.getItem("allNotes");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "1",
            name: "myname",
            details: "hello",
            tags: "a",
            priority: "high",
          },
        ];
  });
  const [deletedNotes, setDeletedNotes] = useState(() => {
    const saved = localStorage.getItem("deletedNotes");
    return saved
      ? JSON.parse(saved)
      : [{ id: "0020", name: "deleted", tags: "b", priority: "medium" }];
  });
  const [archivedNotes, setArchivedNotes] = useState(() => {
    const saved = localStorage.getItem("archivedNotes");
    return saved
      ? JSON.parse(saved)
      : [{ id: "0050", name: "archived", tags: "c", priority: "low" }];
  });
  const [completedNotes, setCompletedNotes] = useState(() => {
    const saved = localStorage.getItem("completedNotes");
    return saved
      ? JSON.parse(saved)
      : [{ id: "0090", name: "completed", tags: "d", priority: "casual" }];
  });
  const [view, setView] = useState("all");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
  }, [allNotes]);

  useEffect(() => {
    localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
  }, [archivedNotes]);

  useEffect(() => {
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
  }, [deletedNotes]);

  useEffect(() => {
    localStorage.setItem("completedNotes", JSON.stringify(completedNotes));
  }, [completedNotes]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const currentNotes = getCurrentNotes();
    if (display && !currentNotes.some((note) => note.id === display.id)) {
      setDisplay(null);
    }
  }, [
    allNotes,
    archivedNotes,
    deletedNotes,
    completedNotes,
    selectedTag,
    selectedPriority,
    searchQuery,
  ]);

  useEffect(() => {
    console.log("allNotes:", allNotes);
    console.log("archivedNotes:", archivedNotes);
    console.log("deletedNotes:", deletedNotes);
    console.log("completedNotes:", completedNotes);
    console.log("selectedTag:", selectedTag);
    console.log("selectedPriority:", selectedPriority);
    console.log("searchQuery:", searchQuery);
    console.log("isSidebarOpen:", isSidebarOpen);
    console.log("isFilterOpen:", isFilterOpen);
  }, [
    allNotes,
    archivedNotes,
    deletedNotes,
    completedNotes,
    selectedTag,
    selectedPriority,
    searchQuery,
    isSidebarOpen,
    isFilterOpen,
  ]);

  const tagOptions = ["a", "b", "c", "d", "e", "f", "g"];
  const priorityOptions = ["high", "medium", "low", "casual"];

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

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

  const archive = (note) => {
    setAllNotes((prev) => prev.filter((item) => item.id !== note.id));
    setArchivedNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  const completeNote = (note) => {
    setAllNotes((prev) => prev.filter((item) => item.id !== note.id));
    setCompletedNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  const undoComplete = (note) => {
    setCompletedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setAllNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  const recoverNote = (note) => {
    setDeletedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setAllNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

  const eraseNote = (note) => {
    setDeletedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setDisplay(null);
  };

  const unArchive = (note) => {
    setArchivedNotes((prev) => prev.filter((item) => item.id !== note.id));
    setAllNotes((prev) => [...prev, note]);
    setDisplay(null);
  };

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

    if (selectedTag) {
      notes = notes.filter((note) => note.tags === selectedTag);
    }

    if (selectedPriority) {
      notes = notes.filter((note) => note.priority === selectedPriority);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      notes = notes.filter((note) => note.name.toLowerCase().includes(query));
    }

    return notes;
  };

  return (
    <main className="notes">
      <Sidebar
        setView={setView}
        tagOptions={tagOptions}
        priorityOptions={priorityOptions}
        setSelectedTag={setSelectedTag}
        setSelectedPriority={setSelectedPriority}
        isSidebarOpen={isSidebarOpen}
        isFilterOpen={isFilterOpen}
        closeSidebar={closeSidebar}
      />
      <section className="notes-content-area">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          setTheme={setTheme}
          toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          toggleFilter={toggleFilter}
          isSidebarOpen={isSidebarOpen}
        />
        <section className="notes-container">
          <NoteList
            display={display}
            allNotes={getCurrentNotes()}
            setAllNotes={setAllNotes}
            setDisplay={setDisplay}
            selectedTag={selectedTag}
            selectedPriority={selectedPriority}
            searchQuery={searchQuery}
            closeSidebar={closeSidebar}
          />
          <section className="note-list-item">
            <NotesListItem
              allNotes={getCurrentNotes()}
              setAllNotes={setAllNotes}
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
