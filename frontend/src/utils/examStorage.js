const STORAGE_KEY = "studyPlannerExams";

// ========================================
// GET SAVED EXAMS
// ========================================

export function getSavedExams() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const exams = JSON.parse(saved);

    return Array.isArray(exams) ? exams : [];
  } catch (error) {
    console.error("Unable to load saved exams:", error);
    return [];
  }
}


// ========================================
// SAVE EXAMS
// ========================================

export function saveExams(exams) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(exams)
    );

    return true;
  } catch (error) {
    console.error("Unable to save exams:", error);
    return false;
  }
}


// ========================================
// ADD EXAM
// ========================================

export function addExam(exam) {
  const exams = getSavedExams();

  const newExam = {
    id: Date.now().toString(),
    ...exam,
  };

  exams.push(newExam);

  saveExams(exams);

  return newExam;
}


// ========================================
// UPDATE EXAM
// ========================================

export function updateExam(examId, updatedExam) {
  const exams = getSavedExams();

  const updatedExams = exams.map((exam) =>
    exam.id === examId
      ? {
          ...exam,
          ...updatedExam,
        }
      : exam
  );

  saveExams(updatedExams);

  return updatedExams;
}


// ========================================
// DELETE EXAM
// ========================================

export function deleteExam(examId) {
  const exams = getSavedExams();

  const updatedExams = exams.filter(
    (exam) => exam.id !== examId
  );

  saveExams(updatedExams);

  return updatedExams;
}


// ========================================
// GET EXAM DATE
// ========================================

export function getExamDate(date, time = "00:00") {
  if (!date) {
    return new Date(NaN);
  }

  const [year, month, day] = date
    .split("-")
    .map(Number);

  const [hours = 0, minutes = 0] = String(time)
    .split(":")
    .map(Number);

  return new Date(
    year,
    month - 1,
    day,
    hours,
    minutes,
    0,
    0
  );
}


// ========================================
// GET NEXT UPCOMING EXAM
// ========================================

export function getNextExam(exams) {
  if (!Array.isArray(exams) || exams.length === 0) {
    return null;
  }

  const now = Date.now();

  const upcomingExams = exams
    .filter((exam) => {
      const examDate = getExamDate(
        exam.date,
        exam.time
      );

      return (
        !Number.isNaN(examDate.getTime()) &&
        examDate.getTime() >= now
      );
    })
    .sort(
      (a, b) =>
        getExamDate(
          a.date,
          a.time
        ).getTime() -
        getExamDate(
          b.date,
          b.time
        ).getTime()
    );

  return upcomingExams[0] || null;
}


// ========================================
// CLEAR ALL EXAMS
// ========================================

export function clearExams() {
  localStorage.removeItem(STORAGE_KEY);
}