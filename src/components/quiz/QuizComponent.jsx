import React, { useState } from 'react';

export function QuizComponent({ topicId, questions = [], onCompleteTopic, isAlreadyCompleted = false, previousScore = null }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;
  const correctCount = questions.filter((question, index) => answers[index] === question.correctIndex).length;
  const score = questions.length ? Math.round(correctCount / questions.length * 100) : 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!allAnswered) return;
    setSubmitted(true);
    onCompleteTopic(topicId, score);
  };

  return (
    <section className="quiz-section">
      <h3>Kuis Singkat</h3>
      <p>Jawab semua pertanyaan lalu tekan Selesaikan Topik. Kuis boleh diulang.</p>
      {isAlreadyCompleted && <p className="simple-note">Topik selesai. Nilai terakhir: {previousScore ?? 0}%.</p>}
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <fieldset key={question.id} disabled={submitted}>
            <legend>{index + 1}. {question.question}</legend>
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="quiz-option">
                <input type="radio" name={`question-${question.id}`} checked={answers[index] === optionIndex} onChange={() => setAnswers({ ...answers, [index]: optionIndex })} />
                {option}
              </label>
            ))}
            {submitted && <p className="quiz-explanation"><strong>{answers[index] === question.correctIndex ? 'Benar. ' : 'Kurang tepat. '}</strong>{question.explanation}</p>}
          </fieldset>
        ))}
        {submitted ? (
          <div aria-live="polite">
            <p><strong>Nilai kuis: {score}%</strong></p>
            <button type="button" className="btn-secondary-light" onClick={() => { setAnswers({}); setSubmitted(false); }}>Ulangi Kuis</button>
          </div>
        ) : <button type="submit" className="btn-primary-lime" disabled={!allAnswered}>Selesaikan Topik</button>}
      </form>
    </section>
  );
}

export default QuizComponent;
