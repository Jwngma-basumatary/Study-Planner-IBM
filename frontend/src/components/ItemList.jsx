import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";


function ItemList() {

  // ========================================
  // SCHEDULE STATE
  // ========================================

  const [schedules, setSchedules] =
    useState([]);

  const [loadingSchedules, setLoadingSchedules] =
    useState(true);

  const [scheduleError, setScheduleError] =
    useState("");


  // ========================================
  // TODO STATE
  // ========================================

  const [todos, setTodos] =
    useState([]);

  const [loadingTodos, setLoadingTodos] =
    useState(true);

  const [todoError, setTodoError] =
    useState("");


  // ========================================
  // GET TODAY'S DATE
  // ========================================

  const getTodayDate = () => {

    const today = new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  // ========================================
  // FORMAT TIME
  // ========================================

  const formatTime = (
    time
  ) => {

    if (!time) {
      return "";
    }


    const [
      hour,
      minute
    ] = time
      .split(":")
      .map(Number);


    const date =
      new Date();

    date.setHours(
      hour,
      minute,
      0,
      0
    );


    return date.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit"
      }
    );

  };


  // ========================================
  // FORMAT DURATION
  // ========================================

  const formatDuration = (
    minutes
  ) => {

    if (!minutes) {
      return "0 min";
    }


    const hours =
      Math.floor(
        minutes / 60
      );


    const remainingMinutes =
      minutes % 60;


    if (hours === 0) {

      return `${remainingMinutes} min`;

    }


    if (remainingMinutes === 0) {

      return `${hours} hr`;

    }


    return `${hours} hr ${remainingMinutes} min`;

  };


  // ========================================
  // LOAD TODAY'S SCHEDULE
  // ========================================

  const loadTodaySchedules =
    async () => {

      const token =
        localStorage.getItem(
          "token"
        );


      // No logged-in user
      if (!token) {

        setSchedules([]);

        setLoadingSchedules(false);

        return;

      }


      try {

        setLoadingSchedules(true);

        setScheduleError("");


        const today =
          getTodayDate();


        const response =
          await fetch(
            `${API_URL}/api/schedules?date=${today}`,
            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );


        // ==================================
        // SESSION EXPIRED
        // ==================================

        if (response.status === 401) {

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );


          throw new Error(
            "Your session has expired. Please log in again."
          );

        }


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Unable to load today's schedule."
          );

        }


        // ==================================
        // STORE REAL SCHEDULES
        // ==================================

        setSchedules(
          data.schedules || []
        );


      } catch (error) {

        console.error(
          "Today's schedule error:",
          error
        );


        setScheduleError(
          error.message ||
          "Unable to load today's schedule."
        );


      } finally {

        setLoadingSchedules(false);

      }

    };


  // ========================================
  // LOAD TODOS
  // ========================================

  const loadTodos = async () => {

    const token =
      localStorage.getItem(
        "token"
      );


    // No logged-in user
    if (!token) {

      setTodos([]);

      setLoadingTodos(false);

      return;

    }


    try {

      setLoadingTodos(true);

      setTodoError("");


      const response =
        await fetch(
          `${API_URL}/api/todos`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );


      // ==================================
      // SESSION EXPIRED
      // ==================================

      if (response.status === 401) {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );


        throw new Error(
          "Your session has expired. Please log in again."
        );

      }


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to load todo list."
        );

      }


      setTodos(
        data.todos || []
      );


    } catch (error) {

      console.error(
        "Todo list error:",
        error
      );


      setTodoError(
        error.message ||
        "Unable to load todo list."
      );


    } finally {

      setLoadingTodos(false);

    }

  };


  // ========================================
  // LOAD DASHBOARD DATA
  // ========================================

  useEffect(() => {

    loadTodaySchedules();

    loadTodos();

  }, []);


  // ========================================
  // TOGGLE TODO
  // ========================================

  const handleToggleTodo =
    async (todo) => {

      const token =
        localStorage.getItem(
          "token"
        );


      if (!token) {

        setTodoError(
          "Please log in again."
        );

        return;

      }


      try {

        setTodoError("");


        const response =
          await fetch(
            `${API_URL}/api/todos/${todo._id}/toggle`,
            {
              method: "PATCH",

              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );


        if (response.status === 401) {

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );


          throw new Error(
            "Your session has expired. Please log in again."
          );

        }


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Unable to update todo."
          );

        }


        setTodos(
          (currentTodos) =>
            currentTodos.map(
              (item) =>
                item._id === todo._id
                  ? data.todo
                  : item
            )
        );


      } catch (error) {

        console.error(
          "Todo toggle error:",
          error
        );


        setTodoError(
          error.message ||
          "Unable to update todo."
        );

      }

    };


  // ========================================
  // OPEN SCHEDULE PAGE
  // ========================================

  const openSchedulePage = () => {

    window.history.pushState(
      {},
      "",
      "/schedule"
    );


    window.dispatchEvent(
      new PopStateEvent(
        "popstate"
      )
    );

  };


  // ========================================
  // OPEN TODO PAGE
  // ========================================

  const openTodoPage = () => {

    window.history.pushState(
      {},
      "",
      "/todos"
    );


    window.dispatchEvent(
      new PopStateEvent(
        "popstate"
      )
    );

  };


  // ========================================
  // RENDER
  // ========================================

  return (

    <div className="dashboard-content">


      {/* ====================================
          TODAY'S SCHEDULE
      ==================================== */}

      <section
        className="schedule-section"
        id="schedule"
      >

        <div className="section-heading">

          <div>

            <h2>
              Today's Schedule
            </h2>

            <p>
              Your study plan for today
            </p>

          </div>


          <button
            type="button"
            className="add-button"
            onClick={
              openSchedulePage
            }
          >
            + Add task
          </button>

        </div>


        {/* ==================================
            LOADING
        ================================== */}

        {loadingSchedules && (

          <div className="home-schedule-message">

            Loading today's schedule...

          </div>

        )}


        {/* ==================================
            ERROR
        ================================== */}

        {!loadingSchedules &&
          scheduleError && (

          <div className="home-schedule-error">

            {scheduleError}

          </div>

        )}


        {/* ==================================
            EMPTY
        ================================== */}

        {!loadingSchedules &&
          !scheduleError &&
          schedules.length === 0 && (

          <div className="home-schedule-empty">

            <h3>
              No schedules for today.
            </h3>

            <p>
              Add a study session from the Schedule page.
            </p>

          </div>

        )}


        {/* ==================================
            REAL TODAY'S SCHEDULES
        ================================== */}

        {!loadingSchedules &&
          !scheduleError &&
          schedules.length > 0 && (

          <div className="schedule-card">

            {schedules.map(
              (item) => (

                <div
                  className={
                    item.completed
                      ? "schedule-item completed"
                      : "schedule-item"
                  }
                  key={item._id}
                >


                  {/* TIME */}

                  <div className="time">

                    {formatTime(
                      item.startTime
                    )}

                  </div>


                  {/* TIMELINE */}

                  <div className="schedule-line">

                    <div className="timeline-dot"></div>

                  </div>


                  {/* SCHEDULE INFORMATION */}

                  <div className="schedule-info">

                    <h3>

                      {item.topic ||
                        item.title ||
                        "Study Session"}

                    </h3>


                    <p>

                      {item.subject}

                      {item.topic &&
                        ` • ${item.topic}`}

                    </p>

                  </div>


                  {/* DURATION */}

                  <span className="duration">

                    {formatDuration(
                      item.duration
                    )}

                  </span>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* ====================================
          REST OF DASHBOARD
      ==================================== */}

      <div className="main-grid">


        {/* ==================================
            UPCOMING ASSIGNMENTS
        ================================== */}

        <section
          className="dashboard-card"
          id="assignments"
        >

          <div className="section-heading">

            <div>

              <h2>
                Upcoming Assignments
              </h2>

              <p>
                Don't miss your deadlines
              </p>

            </div>


            <button
              type="button"
              className="text-button"
            >
              View all
            </button>

          </div>


          <div className="assignment-list">

            <div className="assignment-item">

              <div className="assignment-icon">
                ✓
              </div>

              <div className="assignment-info">

                <h3>
                  React Dashboard
                </h3>

                <p>
                  Web Development
                </p>

              </div>

              <span className="due-date">
                Due tomorrow
              </span>

            </div>


            <div className="assignment-item">

              <div className="assignment-icon">
                ✓
              </div>

              <div className="assignment-info">

                <h3>
                  SQL Practice
                </h3>

                <p>
                  Database Systems
                </p>

              </div>

              <span className="due-date">
                Due Aug 29
              </span>

            </div>


            <div className="assignment-item">

              <div className="assignment-icon">
                ✓
              </div>

              <div className="assignment-info">

                <h3>
                  Tree Implementation
                </h3>

                <p>
                  Data Structures
                </p>

              </div>

              <span className="due-date">
                Due Sep 01
              </span>

            </div>

          </div>

        </section>


        {/* ==================================
            TOP PRIORITIES
        ================================== */}

        <section
          className="dashboard-card"
          id="goals"
        >

          <div className="section-heading">

            <div>

              <h2>
                Top Priorities
              </h2>

              <p>
                Focus on these tasks
              </p>

            </div>

          </div>


          <div className="priority-list">

            <label className="priority-item">

              <input
                type="checkbox"
              />

              <span>
                Complete React dashboard
              </span>

            </label>


            <label className="priority-item">

              <input
                type="checkbox"
              />

              <span>
                Revise binary trees
              </span>

            </label>


            <label className="priority-item">

              <input
                type="checkbox"
              />

              <span>
                Practice SQL queries
              </span>

            </label>


            <label className="priority-item">

              <input
                type="checkbox"
              />

              <span>
                Prepare for upcoming exam
              </span>

            </label>

          </div>

        </section>


        {/* ==================================
            CALENDAR
        ================================== */}

        <section
          className="dashboard-card calendar-card"
        >

          <div className="section-heading">

            <div>

              <h2>
                August 2026
              </h2>

              <p>
                Your study calendar
              </p>

            </div>


            <div className="calendar-arrows">

              <button type="button">
                ‹
              </button>

              <button type="button">
                ›
              </button>

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
                {
                  length: 31
                },
                (_, index) =>
                  index + 1
              ).map(
                (day) => (

                  <span
                    key={day}
                    className={
                      day === 26
                        ? "today"
                        : [27, 29, 31].includes(
                            day
                          )
                        ? "has-task"
                        : ""
                    }
                  >
                    {day}
                  </span>

                )
              )}

            </div>

          </div>

        </section>


        {/* ==================================
            TODO LIST
        ================================== */}

        <section
          className="dashboard-card"
          id="todos"
        >

          <div className="section-heading">

            <div>

              <h2>
                Todo List
              </h2>

              <p>
                Things you need to get done
              </p>

            </div>


            <button
              type="button"
              className="text-button"
              onClick={
                openTodoPage
              }
            >
              View all
            </button>

          </div>


          {/* ==================================
              LOADING
          ================================== */}

          {loadingTodos && (

            <div className="home-todo-message">

              Loading todo list...

            </div>

          )}


          {/* ==================================
              ERROR
          ================================== */}

          {!loadingTodos &&
            todoError && (

            <div className="home-todo-error">

              {todoError}

            </div>

          )}


          {/* ==================================
              EMPTY
          ================================== */}

          {!loadingTodos &&
            !todoError &&
            todos.length === 0 && (

            <div className="home-todo-empty">

              <h3>
                Your todo list is empty.
              </h3>

              <p>
                Add something you need to accomplish.
              </p>

            </div>

          )}


          {/* ==================================
              REAL TODOS
          ================================== */}

          {!loadingTodos &&
            !todoError &&
            todos.length > 0 && (

            <div className="priority-list">

              {todos
                .slice(0, 5)
                .map(
                  (todo) => (

                    <label
                      className={
                        todo.completed
                          ? "priority-item completed"
                          : "priority-item"
                      }
                      key={
                        todo._id
                      }
                    >

                      <input
                        type="checkbox"
                        checked={
                          todo.completed
                        }
                        onChange={() =>
                          handleToggleTodo(
                            todo
                          )
                        }
                      />


                      <span>
                        {todo.title}
                      </span>

                    </label>

                  )
                )}

            </div>

          )}

        </section>


        {/* ==================================
            EXAM COUNTDOWN
        ================================== */}

        <section
          className="dashboard-card exam-card"
          id="exams"
        >

          <div className="section-heading">

            <div>

              <h2>
                Exam Countdown
              </h2>

              <p>
                Data Structures Final Exam
              </p>

            </div>


            <span className="exam-icon">
              !
            </span>

          </div>


          <div className="countdown">

            <div>

              <strong>
                12
              </strong>

              <span>
                Days
              </span>

            </div>


            <div>

              <strong>
                08
              </strong>

              <span>
                Hours
              </span>

            </div>


            <div>

              <strong>
                34
              </strong>

              <span>
                Minutes
              </span>

            </div>

          </div>


          <button
            type="button"
            className="study-button"
          >
            Start studying
          </button>

        </section>


        {/* ==================================
            ACTIVITY
        ================================== */}

        <section
          className="dashboard-card activity-card"
        >

          <div className="section-heading">

            <div>

              <h2>
                Study Activity
              </h2>

              <p>
                Your activity this week
              </p>

            </div>


            <span className="activity-number">
              18.5 hrs
            </span>

          </div>


          <div className="activity-chart">

            <div
              className="bar"
              style={{
                height: "40%"
              }}
            >
              <span>
                Mon
              </span>
            </div>


            <div
              className="bar"
              style={{
                height: "65%"
              }}
            >
              <span>
                Tue
              </span>
            </div>


            <div
              className="bar"
              style={{
                height: "50%"
              }}
            >
              <span>
                Wed
              </span>
            </div>


            <div
              className="bar"
              style={{
                height: "80%"
              }}
            >
              <span>
                Thu
              </span>
            </div>


            <div
              className="bar"
              style={{
                height: "60%"
              }}
            >
              <span>
                Fri
              </span>
            </div>


            <div
              className="bar"
              style={{
                height: "90%"
              }}
            >
              <span>
                Sat
              </span>
            </div>


            <div
              className="bar"
              style={{
                height: "35%"
              }}
            >
              <span>
                Sun
              </span>
            </div>

          </div>

        </section>

      </div>

    </div>

  );

}


export default ItemList;