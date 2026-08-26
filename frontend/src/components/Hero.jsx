function Hero() {
  return (
    <section className="hero-section" id="home">

      <div className="welcome">
        <div>
          <p className="small-heading">WEDNESDAY, AUGUST 26</p>

          <h1>Good morning, Muskan 👋</h1>

          <p className="welcome-text">
            Stay focused and keep making progress toward your goals.
          </p>
        </div>

        <div className="search-box">
          🔍
          <input
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="course-overview" id="courses">

        <div className="section-heading">
          <div>
            <h2>Course Overview</h2>
            <p>Your current courses</p>
          </div>

          <button className="view-button">
            View all
          </button>
        </div>

        <div className="course-grid">

          <div className="course-card">
            <div className="course-icon">DS</div>

            <div>
              <h3>Data Structures</h3>
              <p>8 chapters</p>

              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: "75%" }}
                ></div>
              </div>

              <small>75% completed</small>
            </div>
          </div>

          <div className="course-card">
            <div className="course-icon">DB</div>

            <div>
              <h3>Database Systems</h3>
              <p>6 chapters</p>

              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: "60%" }}
                ></div>
              </div>

              <small>60% completed</small>
            </div>
          </div>

          <div className="course-card">
            <div className="course-icon">WD</div>

            <div>
              <h3>Web Development</h3>
              <p>10 chapters</p>

              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: "45%" }}
                ></div>
              </div>

              <small>45% completed</small>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;