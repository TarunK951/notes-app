import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import "../../../styles/noteList.css";

function NoteList({ setDisplay, setAllNotes, allNotes, selectedTag }) {
  const tagOptions = ["a", "b", "c", "d", "e", "f", "g"];
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");

  const addNewItem = (e) => {
    e.preventDefault();
    if (!name.trim() && !tags && !details.trim()) return; // Prevent empty submissions

    setAllNotes([
      ...allNotes,
      {
        id: Date.now(),
        name: name.trim() || "empty",
        details,
        tags,
      },
    ]);

    setName("");
    setDetails("");
    setTags("");
    setOpen(false);
  };

  const handleTagClick = (tag) => {
    setTags(tags === tag ? "" : tag); // Toggle tag selection
  };

  return (
    <div className="notes-list">
      <div className="add-container">
        <button className="add-btn" onClick={() => setOpen(!open)}>
          Add <IoIosAdd />
        </button>
      </div>

      {open && (
        <div className="input-pop">
          <button className="input-close-btn" onClick={() => setOpen(false)}>
            X
          </button>
          <form onSubmit={addNewItem} className="input-form">
            <div className="inputs-labels">
              <label htmlFor="name">Name</label>
              <input
                className="input-area"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inputs-labels">
              <label>Tags</label>
              <div className="input-tags">
                {tagOptions.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`tag-button ${tags === tag ? "active-tag" : ""}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="inputs-labels">
              <label htmlFor="details">Details</label>
              <textarea
                className="input-area"
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                placeholder="Enter more details..."
              />
            </div>
            <div className="submit">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="list-container">
        {allNotes.length === 0 && selectedTag ? (
          <p className="no-notes">No elements with this tag</p>
        ) : (
          allNotes.map((item, index) => (
            <div
              className="list-details"
              key={item.id || index}
              onClick={() => setDisplay(item)}
            >
              <p>{item.name}</p>
              <p>{item.tags || "No tags"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NoteList;
