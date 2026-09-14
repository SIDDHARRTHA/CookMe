function QuestionMarkIcon({
  size = 90,
  color = "#E8622C"
}) {
  return (
    <div
      className="question-mark-icon"
      style={{
        fontSize: size,
        color
      }}
      aria-hidden="true"
    >
      ?
    </div>
  );
}

export default QuestionMarkIcon;