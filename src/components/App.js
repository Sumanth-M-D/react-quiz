import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "../contexts/QuizContext";
// import defaultQuestions from "../questions";

const SECS_PER_QUESTION = 30;

//.
//? App component
export default function App() {
  const { questions, status, currentIndex } = useQuiz();

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, q) => acc + q.points, 0);
  const seconds = SECS_PER_QUESTION * numQuestions;

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question />

            <Footer>
              <NextButton numQuestions={numQuestions} />
              <Timer
                seconds={seconds}
                // secondsRemaining={secondsRemaining}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen maxPossiblePoints={maxPossiblePoints} />
        )}
      </Main>
    </div>
  );
}
