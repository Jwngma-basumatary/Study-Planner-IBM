function PagePlaceholder({
  title,
  description
}) {

  return (
    <section className="page-placeholder">

      <p className="small-heading">
        STUDY PLANNER
      </p>


      <h1>
        {title}
      </h1>


      <p>
        {description}
      </p>


      <div className="placeholder-card">

        This page is connected to the
        navigation. Its full functionality
        will be implemented in its scheduled
        development step.

      </div>

    </section>
  );
}


export default PagePlaceholder;