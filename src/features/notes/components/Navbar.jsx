import { FaSearch } from "react-icons/fa";
import "../../../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="notes-navbar">
      <div className="title">
        <h2>All Notes</h2>
      </div>
      <div className="nav-input-container">
        <input className="nav-input" placeholder="search" />
        <FaSearch />
      </div>
    </nav>
  );
}
