import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import "../../../styles/noteList.css";

function NoteList({ setDisplay, notes, setData, data }) {
  const tagOptions = ["a", "b", "c", "d", "e", "f", "g"];
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");
  const addNewItem = (e) => {
    e.preventDefault();

    setData([
      ...data,
      {
        id: new Date().toISOString(),
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
          <button onClick={() => setOpen(false)}>X</button>
          <form onSubmit={addNewItem}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Tags</label>
              {tagOptions.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setTags(tag)}
                  className={tags === tag ? "active-tag" : ""}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div>
              <label htmlFor="details">Details</label>
              <input
                type="text"
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="list-container">
        {notes.map((item, index) => (
          <div
            className="list-details"
            key={item.id || index}
            onClick={() => setDisplay(item)}
          >
            <p>{item.name}</p>
            <p>{item.tags}</p>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
