import { useQuiz } from "../contexts/QuizContext";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;

  return (
    <div>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              hasAnswered
                ? question.correctOption === i
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
