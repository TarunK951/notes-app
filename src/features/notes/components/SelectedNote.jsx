import "../../../styles/selectedNotes.css";

function SelectedNote({ display, setDisplay }) {
  return (
    <div className="selected-note">
      <button className="close-btn" onClick={() => setDisplay(!display)}>
        Close
      </button>
      <h3>Selected Note</h3>
      <p>
        <strong>Name:</strong> {display.name}
      </p>
      <p>
        <strong>Tags:</strong> {display.tags}
      </p>
      <p>
        <strong>Details:</strong> {display.details}
      </p>
    </div>
  );
}

export default SelectedNote;
