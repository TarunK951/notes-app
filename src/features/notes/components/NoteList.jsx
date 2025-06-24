import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import "../../../styles/noteList.css";

function NoteList({ setDisplay, setAllNotes, allNotes }) {
  const tagOptions = ["a", "b", "c", "d", "e", "f", "g"];
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");
  const addNewItem = (e) => {
    e.preventDefault();

    setAllNotes([
      ...allNotes,
      {
        id: new Date(),
        name: name.trim() === "" ? "empty" : name,
        details,
        tags,
      },
    ]);

    setName("");
    setDetails("");
    setTags("");
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
                    id="tag"
                    onClick={() => setTags(tag)}
                    className={tags === tag ? "active-tag" : ""}
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
        {allNotes.map((item, index) => (
          <div
            className="list-details"
            key={item.id || index}
            onClick={() => setDisplay(item)}
          >
            <p>{item.name}</p>
            <p>{item.tags}</p>
            {/* <p>{item.details}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
