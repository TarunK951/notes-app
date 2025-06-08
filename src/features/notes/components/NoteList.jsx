//
import { IoIosAdd } from "react-icons/io";
import "../../../styles/noteList.css";

const arr = [{ name: "myname", details: "hello", tags: "ok" }];

function NoteList() {
  return (
    <div className="notes-list">
      <div className="add-container">
        <button className="add-btn">
          Add <IoIosAdd />{" "}
        </button>
      </div>
      <div className="list-container">
        {arr.map((item, index) => (
          <div className="list-details" key={index}>
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
