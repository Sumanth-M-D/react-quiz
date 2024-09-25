function NextButton({ dispatch, answer, currentIndex, numQuestions }) {
  if (answer === null) return null;

  const isLast = currentIndex + 1 === numQuestions;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type: isLast ? "finished" : `nextQuestion`,
        })
      }
    >
      {isLast ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
