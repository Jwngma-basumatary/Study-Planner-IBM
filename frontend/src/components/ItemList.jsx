function ItemList() {

  const schedule = [
    {
      time: "09:00 AM",
      subject: "Data Structures",
      topic: "Binary Trees",
      duration: "1 hr 30 min"
    },
    {
      time: "11:00 AM",
      subject: "Database Systems",
      topic: "SQL Queries",
      duration: "1 hr"
    },
    {
      time: "02:00 PM",
      subject: "Web Development",
      topic: "React Components",
      duration: "2 hrs"
    }
  ];

  const assignments = [
    {
      title: "React Dashboard",
      subject: "Web Development",
      date: "Due tomorrow"
    },
    {
      title: "SQL Practice",
      subject: "Database Systems",
      date: "Due Aug 29"
    },
    {
      title: "Tree Implementation",
      subject: "Data Structures",
      date: "Due Sep 01"
    }
  ];

  const priorities = [
    "Complete React dashboard",
    "Revise binary trees",
    "Practice SQL queries",
    "Prepare for upcoming exam"
  ];

  return (
    <div className="dashboard-content">

      {/* TODAY'S SCHEDULE */}

      <section className="schedule-section" id="schedule">

        <div className="section-heading">
          <div>
            <h2>Today's Schedule</h2>
            <p>Your study plan for today</p>
          </div>

          <button className="add-button">
            + Add task
          </button>
        </div>

        <div className="schedule-card">

          {schedule.map((item, index) => (
            <div className="schedule-item" key={index}>

              <div className="time">
                {item.time}
              </div>

              <div className="schedule-line">
                <div className="timeline-dot"></div>
              </div>

              <div className="schedule-info">
                <h3>{item.subject}</h3>
                <p>{item.topic}</p>
              </div>

              <span className="duration">
                {item.duration}
              </span>

            </div>
          ))}

        </div>

      </section>


      {/* TWO COLUMN AREA */}

      <div className="main-grid">

        {/* UPCOMING ASSIGNMENTS */}

        <section className="dashboard-card" id="assignments">

          <div className="section-heading">
            <div>
              <h2>Upcoming Assignments</h2>
              <p>Don't miss your deadlines</p>
            </div>

            <button className="text-button">
              View all
            </button>
          </div>

          <div className="assignment-list">

            {assignments.map((assignment, index) => (

              <div className="assignment-item" key={index}>

                <div className="assignment-icon">
                  ✓
                </div>

                <div className="assignment-info">
                  <h3>{assignment.title}</h3>
                  <p>{assignment.subject}</p>
                </div>

                <span className="due-date">
                  {assignment.date}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* TOP PRIORITIES */}

        <section className="dashboard-card" id="goals">

          <div className="section-heading">
            <div>
              <h2>Top Priorities</h2>
              <p>Focus on these tasks</p>
            </div>
          </div>

          <div className="priority-list">

            {priorities.map((priority, index) => (

              <label className="priority-item" key={index}>

                <input type="checkbox" />

                <span>{priority}</span>

              </label>

            ))}

          </div>

        </section>


        {/* CALENDAR */}

        <section className="dashboard-card calendar-card">

          <div className="section-heading">
            <div>
              <h2>August 2026</h2>
              <p>Your study calendar</p>
            </div>

            <div className="calendar-arrows">
              <button>‹</button>
              <button>›</button>
            </div>
          </div>

          <div className="calendar">

            <div className="calendar-header">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="calendar-days">

              <span className="empty"></span>
              <span className="empty"></span>
              <span className="empty"></span>

              {Array.from(
                { length: 31 },
                (_, index) => index + 1
              ).map((day) => (

                <span
                  key={day}
                  className={
                    day === 26
                      ? "today"
                      : [27, 29, 31].includes(day)
                      ? "has-task"
                      : ""
                  }
                >
                  {day}
                </span>

              ))}

            </div>

          </div>

        </section>


        {/* RECENT NOTES */}

        <section className="dashboard-card" id="notes">

          <div className="section-heading">

            <div>
              <h2>Recent Notes</h2>
              <p>Your latest study notes</p>
            </div>

            <button className="text-button">
              View all
            </button>

          </div>

          <div className="notes-list">

            <div className="note-item">
              <div className="note-icon">N</div>

              <div>
                <h3>Binary Tree Notes</h3>
                <p>Updated 2 hours ago</p>
              </div>
            </div>

            <div className="note-item">
              <div className="note-icon">N</div>

              <div>
                <h3>SQL Commands</h3>
                <p>Updated yesterday</p>
              </div>
            </div>

            <div className="note-item">
              <div className="note-icon">N</div>

              <div>
                <h3>React Hooks</h3>
                <p>Updated Aug 24</p>
              </div>
            </div>

          </div>

        </section>


        {/* EXAM COUNTDOWN */}

        <section className="dashboard-card exam-card" id="exams">

          <div className="section-heading">

            <div>
              <h2>Exam Countdown</h2>
              <p>Data Structures Final Exam</p>
            </div>

            <span className="exam-icon">!</span>

          </div>

          <div className="countdown">

            <div>
              <strong>12</strong>
              <span>Days</span>
            </div>

            <div>
              <strong>08</strong>
              <span>Hours</span>
            </div>

            <div>
              <strong>34</strong>
              <span>Minutes</span>
            </div>

          </div>

          <button className="study-button">
            Start studying
          </button>

        </section>


        {/* ACTIVITY */}

        <section className="dashboard-card activity-card">

          <div className="section-heading">

            <div>
              <h2>Study Activity</h2>
              <p>Your activity this week</p>
            </div>

            <span className="activity-number">
              18.5 hrs
            </span>

          </div>

          <div className="activity-chart">

            <div className="bar" style={{ height: "40%" }}>
              <span>Mon</span>
            </div>

            <div className="bar" style={{ height: "65%" }}>
              <span>Tue</span>
            </div>

            <div className="bar" style={{ height: "50%" }}>
              <span>Wed</span>
            </div>

            <div className="bar" style={{ height: "80%" }}>
              <span>Thu</span>
            </div>

            <div className="bar" style={{ height: "60%" }}>
              <span>Fri</span>
            </div>

            <div className="bar" style={{ height: "90%" }}>
              <span>Sat</span>
            </div>

            <div className="bar" style={{ height: "35%" }}>
              <span>Sun</span>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default ItemList;