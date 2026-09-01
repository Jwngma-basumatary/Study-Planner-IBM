import { useEffect, useState } from "react";


const API_URL = import.meta.env.VITE_API_URL;


function Assignments() {

  
  const [assignments, setAssignments] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  const [success, setSuccess] =
    useState("");


  

  const [statusFilter, setStatusFilter] =
    useState("all");


  const [priorityFilter, setPriorityFilter] =
    useState("all");


  const [subjectFilter, setSubjectFilter] =
    useState("all");


  

  const [showForm, setShowForm] =
    useState(false);


  const [editingId, setEditingId] =
    useState(null);


  const [title, setTitle] =
    useState("");


  const [subject, setSubject] =
    useState("");


  const [topic, setTopic] =
    useState("");


  const [dueDate, setDueDate] =
    useState("");


  const [priority, setPriority] =
    useState("Medium");


  const [description, setDescription] =
    useState("");



  const getToken = () => {

    return localStorage.getItem(
      "token"
    );

  };



  const apiRequest = async (
    url,
    options = {}
  ) => {

    const token =
      getToken();


    if (!token) {

      throw new Error(
        "Your session has expired. Please log in again."
      );

    }


    const response =
      await fetch(
        `${API_URL}${url}`,
        {

          ...options,

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,

            ...(options.headers || {})

          }

        }
      );


    const data =
      await response.json();


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


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Something went wrong."
      );

    }


    return data;

  };



  const loadAssignments = async () => {

    try {

      setLoading(true);

      setError("");


      const data =
        await apiRequest(
          "/api/assignments"
        );


      setAssignments(
        data.assignments || []
      );


    } catch (error) {

      console.error(
        "Load assignments error:",
        error
      );


      setError(
        error.message ||
        "Unable to load assignments."
      );


    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadAssignments();

  }, []);



  const showSuccessMessage = (
    message
  ) => {

    setSuccess(message);


    setTimeout(() => {

      setSuccess("");

    }, 2500);

  };



  const resetForm = () => {

    setEditingId(null);

    setTitle("");

    setSubject("");

    setTopic("");

    setDueDate("");

    setPriority("Medium");

    setDescription("");

    setShowForm(false);

  };



  const openAddForm = () => {

    resetForm();

    setShowForm(true);

    setError("");

  };



  const openEditForm = (
    assignment
  ) => {

    setEditingId(
      assignment._id
    );


    setTitle(
      assignment.title
    );


    setSubject(
      assignment.subject
    );


    setTopic(
      assignment.topic || ""
    );


    setDueDate(
      assignment.dueDate
    );


    setPriority(
      assignment.priority
    );


    setDescription(
      assignment.description || ""
    );


    setError("");

    setShowForm(true);

  };



  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    setError("");


    if (
      !title.trim() ||
      !subject.trim() ||
      !dueDate
    ) {

      setError(
        "Title, subject and due date are required."
      );

      return;

    }


    try {

      const isEditing =
        Boolean(editingId);


      const url = isEditing
        ? `/api/assignments/${editingId}`
        : "/api/assignments";


      const method = isEditing
        ? "PUT"
        : "POST";


      const data =
        await apiRequest(
          url,
          {

            method,

            body: JSON.stringify({

              title:
                title.trim(),

              subject:
                subject.trim(),

              topic:
                topic.trim(),

              dueDate,

              priority,

              description:
                description.trim()

            })

          }
        );


      if (isEditing) {

        setAssignments(
          (current) =>

            current.map(
              (item) =>

                item._id ===
                editingId

                  ? data.assignment

                  : item

            )
        );


        showSuccessMessage(
          "Assignment updated successfully."
        );

      } else {

        setAssignments(
          (current) => [

            data.assignment,

            ...current

          ]
        );


        showSuccessMessage(
          "Assignment added successfully."
        );

      }


      resetForm();


    } catch (error) {

      console.error(
        "Save assignment error:",
        error
      );


      setError(
        error.message ||
        "Unable to save assignment."
      );

    }

  };


  

  const handleDelete = async (
    assignment
  ) => {

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${assignment.title}"?`
      );


    if (!confirmed) {

      return;

    }


    try {

      setError("");


      await apiRequest(
        `/api/assignments/${assignment._id}`,
        {
          method: "DELETE"
        }
      );


      setAssignments(
        (current) =>

          current.filter(
            (item) =>

              item._id !==
              assignment._id
          )

      );


      showSuccessMessage(
        "Assignment deleted successfully."
      );


    } catch (error) {

      console.error(
        "Delete assignment error:",
        error
      );


      setError(
        error.message ||
        "Unable to delete assignment."
      );

    }

  };


  
  const handleToggle = async (
    assignment
  ) => {

    try {

      setError("");


      const data =
        await apiRequest(
          `/api/assignments/${assignment._id}/toggle`,
          {
            method: "PATCH"
          }
        );


      setAssignments(
        (current) =>

          current.map(
            (item) =>

              item._id ===
              assignment._id

                ? data.assignment

                : item

          )
      );


    } catch (error) {

      console.error(
        "Toggle assignment error:",
        error
      );


      setError(
        error.message ||
        "Unable to update assignment."
      );

    }

  };


  

  const formatDate = (
    date
  ) => {

    if (!date) {

      return "";

    }


    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    );

  };




  const subjects = [
    ...new Set(
      assignments.map(
        (assignment) =>
          assignment.subject
      )
    )
  ];



  const filteredAssignments =
    assignments.filter(
      (assignment) => {

        // Status
        if (
          statusFilter ===
          "pending" &&
          assignment.completed
        ) {

          return false;

        }


        if (
          statusFilter ===
          "completed" &&
          !assignment.completed
        ) {

          return false;

        }


        // Priority
        if (
          priorityFilter !==
          "all" &&
          assignment.priority !==
          priorityFilter
        ) {

          return false;

        }


        // Subject
        if (
          subjectFilter !==
          "all" &&
          assignment.subject !==
          subjectFilter
        ) {

          return false;

        }


        return true;

      }
    );


  

  const totalAssignments =
    assignments.length;


  const completedAssignments =
    assignments.filter(
      (assignment) =>
        assignment.completed
    ).length;


  const pendingAssignments =
    totalAssignments -
    completedAssignments;


  const highPriorityAssignments =
    assignments.filter(
      (assignment) =>
        assignment.priority ===
          "High" &&
        !assignment.completed
    ).length;


  

  if (loading) {

    return (

      <section className="assignments-page">

        <div className="assignments-header">

          <div>

            <p className="small-heading">
              STUDY PLANNER
            </p>

            <h1>
              Assignments
            </h1>

            <p>
              Manage your assignments and deadlines.
            </p>

          </div>

        </div>


        <div className="assignment-loading">
          Loading...
        </div>

      </section>

    );

  }


  

  return (

    <section className="assignments-page">



      <div className="assignments-header">

        <div>

          <p className="small-heading">
            STUDY PLANNER
          </p>

          <h1>
            Assignments
          </h1>

          <p>
            Manage your assignments and deadlines.
          </p>

        </div>


        <button
          type="button"
          className="add-button"
          onClick={openAddForm}
        >
          + Add Assignment
        </button>

      </div>


      
      {error && (

        <div className="assignment-error">
          {error}
        </div>

      )}


      {success && (

        <div className="assignment-success">
          {success}
        </div>

      )}


      

      <div className="assignment-stats">

        <div className="assignment-stat">

          <span>
            Total
          </span>

          <strong>
            {totalAssignments}
          </strong>

        </div>


        <div className="assignment-stat">

          <span>
            Pending
          </span>

          <strong>
            {pendingAssignments}
          </strong>

        </div>


        <div className="assignment-stat">

          <span>
            Completed
          </span>

          <strong>
            {completedAssignments}
          </strong>

        </div>


        <div className="assignment-stat">

          <span>
            High Priority
          </span>

          <strong>
            {highPriorityAssignments}
          </strong>

        </div>

      </div>



      {showForm && (

        <div className="form-card">

          <div className="form-card-header">

            <h2>

              {editingId
                ? "Edit Assignment"
                : "Add Assignment"}

            </h2>


            <button
              type="button"
              className="close-button"
              onClick={resetForm}
            >
              ×
            </button>

          </div>


          <form
            onSubmit={handleSubmit}
          >

            <div className="assignment-form-grid">



              <div>

                <label>
                  Assignment Title
                </label>

                <input
                  type="text"
                  placeholder="e.g. DBMS Project"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                />

              </div>



              <div>

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="e.g. Database Systems"
                  value={subject}
                  onChange={(event) =>
                    setSubject(
                      event.target.value
                    )
                  }
                />

              </div>



              <div>

                <label>
                  Topic
                </label>

                <input
                  type="text"
                  placeholder="e.g. Normalization"
                  value={topic}
                  onChange={(event) =>
                    setTopic(
                      event.target.value
                    )
                  }
                />

              </div>



              <div>

                <label>
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) =>
                    setDueDate(
                      event.target.value
                    )
                  }
                />

              </div>



              <div>

                <label>
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(event) =>
                    setPriority(
                      event.target.value
                    )
                  }
                >

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                </select>

              </div>

            </div>



            <label>
              Description
            </label>

            <textarea
              placeholder="Add assignment details..."
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              rows="4"
            />



            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="save-button"
              >

                {editingId
                  ? "Update Assignment"
                  : "Save Assignment"}

              </button>

            </div>

          </form>

        </div>

      )}


      

      <div className="assignment-filters">

        <div>

          <label>
            Status
          </label>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
          >

            <option value="all">
              All
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="completed">
              Completed
            </option>

          </select>

        </div>


        <div>

          <label>
            Priority
          </label>

          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(
                event.target.value
              )
            }
          >

            <option value="all">
              All Priorities
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

        </div>


        <div>

          <label>
            Subject
          </label>

          <select
            value={subjectFilter}
            onChange={(event) =>
              setSubjectFilter(
                event.target.value
              )
            }
          >

            <option value="all">
              All Subjects
            </option>


            {subjects.map(
              (item) => (

                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>

              )
            )}

          </select>

        </div>

      </div>


      

      {filteredAssignments.length === 0 ? (

        <div className="assignment-empty">

          <div className="assignment-empty-icon">
            ✓
          </div>


          <h2>
            No assignments found.
          </h2>


          <p>
            Add an assignment or change your filters.
          </p>


          <button
            type="button"
            className="add-button"
            onClick={openAddForm}
          >
            + Add Assignment
          </button>

        </div>

      ) : (

        <div className="assignment-list">

          {filteredAssignments.map(
            (assignment) => (

              <article
                className={
                  assignment.completed
                    ? "assignment-card completed"
                    : "assignment-card"
                }
                key={
                  assignment._id
                }
              >



                <button
                  type="button"
                  className="assignment-check"
                  onClick={() =>
                    handleToggle(
                      assignment
                    )
                  }
                >

                  {assignment.completed
                    ? "✓"
                    : "○"}

                </button>



                <div className="assignment-details">

                  <div className="assignment-title-row">

                    <h2>
                      {assignment.title}
                    </h2>


                    <span
                      className={
                        `priority-badge priority-${assignment.priority.toLowerCase()}`
                      }
                    >
                      {assignment.priority}
                    </span>


                    {assignment.completed && (

                      <span className="completed-badge">
                        Completed
                      </span>

                    )}

                  </div>


                  <p className="assignment-subject">

                    {assignment.subject}

                    {assignment.topic &&
                      ` • ${assignment.topic}`}

                  </p>


                  {assignment.description && (

                    <p className="assignment-description">

                      {
                        assignment.description
                      }

                    </p>

                  )}


                  <div className="assignment-meta">

                    <span>

                      Due:
                      {" "}
                      {formatDate(
                        assignment.dueDate
                      )}

                    </span>

                  </div>

                </div>



                <div className="assignment-actions">

                  <button
                    type="button"
                    className="complete-button"
                    onClick={() =>
                      handleToggle(
                        assignment
                      )
                    }
                  >

                    {assignment.completed
                      ? "Mark Incomplete"
                      : "Complete"}

                  </button>


                  <button
                    type="button"
                    className="text-button"
                    onClick={() =>
                      openEditForm(
                        assignment
                      )
                    }
                  >
                    Edit
                  </button>


                  <button
                    type="button"
                    className="danger-text-button"
                    onClick={() =>
                      handleDelete(
                        assignment
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </article>

            )
          )}

        </div>

      )}

    </section>

  );

}


export default Assignments;
