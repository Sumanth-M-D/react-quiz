import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, currentIndex } = useQuiz();

  const question = questions[currentIndex];
  return (
    <div className="question">
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
