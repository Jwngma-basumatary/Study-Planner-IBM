function Navbar({ onLogout }) {

  return (
    <aside className="sidebar">

      <div className="profile">

        <div className="profile-avatar">
          M
        </div>

        <div>
          <h3>Muskan</h3>
          <p>Student</p>
        </div>

      </div>


      <nav className="side-nav">

        <p className="nav-title">
          MENU
        </p>


        <a href="#home" className="active">
          <span>⌂</span>
          Home
        </a>


        <a href="#courses">
          <span>▣</span>
          Courses
        </a>


        <a href="#schedule">
          <span>◷</span>
          Schedule
        </a>


        <a href="#assignments">
          <span>✓</span>
          Assignments
        </a>


        <a href="#notes">
          <span>▤</span>
          Notes
        </a>


        <a href="#exams">
          <span>▥</span>
          Exams
        </a>


        <a href="#goals">
          <span>◎</span>
          Goals
        </a>


        <p className="nav-title bottom-title">
          ACCOUNT
        </p>


        <a href="#settings">
          <span>⚙</span>
          Settings
        </a>


        <a href="#dark">
          <span>☾</span>
          Dark Mode
        </a>


        <button
          className="logout-button"
          onClick={onLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </nav>

    </aside>
  );
}

export default Navbar;