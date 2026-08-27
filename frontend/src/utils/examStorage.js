// Exams are stored in MongoDB.
// This file only contains reusable date helpers.

export function getExamDate(
  date,
  time = "00:00"
) {
  if (!date) {
    return new Date(NaN);
  }

  return new Date(
    `${date}T${time || "00:00"}:00`
  );
}


export function getNextExam(exams = []) {

  const now = Date.now();

  return exams
    .filter((exam) => {

      const date =
        getExamDate(
          exam.date,
          exam.time
        ).getTime();

      return date >= now;
    })

    .sort((a, b) => {

      return (
        getExamDate(
          a.date,
          a.time
        ) -

        getExamDate(
          b.date,
          b.time
        )
      );

    })[0] || null;
}