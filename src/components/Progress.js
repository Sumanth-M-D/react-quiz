import { useQuiz } from "../contexts/QuizContext";

function Progress({ numQuestions, maxPossiblePoints }) {
  const { currentIndex, points, answer } = useQuiz();

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={currentIndex + Number(answer !== null)}
      />
      <p>
        Question: <strong>{currentIndex + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
