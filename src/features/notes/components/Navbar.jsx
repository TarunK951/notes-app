import { FaBars, FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import "../../../styles/navbar.css";

function Navbar({
  searchQuery,
  setSearchQuery,
  theme,
  setTheme,
  toggleSidebar,
  toggleFilter,
  isSidebarOpen,
}) {
  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="notes-nav">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes..."
          className="search-input"
        />
        {searchQuery && (
          <button className="clear-btn" onClick={() => setSearchQuery("")}>
            <FaTimes />
          </button>
        )}
      </div>
      <div className="nav-actions">
        <button className="filter-btn mobile-only" onClick={toggleFilter}>
          <FaFilter />
        </button>
        <button className="menu-btn mobile-only" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <button className="theme-btn" onClick={handleThemeChange}>
          {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
