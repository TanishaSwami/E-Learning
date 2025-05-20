document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('quiz-form');
  const progressCircle = document.getElementById('progress-circle');
  const progressText = document.getElementById('progress-text');
  const totalQuestions = document.querySelectorAll('.question').length;
  let answeredQuestions = 0;

  document.querySelectorAll('.quiz-answer').forEach((input) => {
    input.addEventListener('change', (event) => {
      const name = event.target.name;
      const answered = document.querySelectorAll(`input[name="${name}"]:checked`).length;
      if (answered) {
        answeredQuestions++;
        document.querySelectorAll(`input[name="${name}"]`).forEach((inp) => {
          inp.disabled = true;
        });
        updateProgress();
      }
    });
  });

  quizForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(quizForm);
    const answers = Object.fromEntries(formData.entries());

    fetch('/submit-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answers)
    })
    .then(response => response.json())
    .then(data => {
      const { score } = data;
      const progress = (score / totalQuestions) * 100;

      progressText.textContent = `${progress}%`;
      document.getElementById('result-message').textContent = `You answered ${score} out of ${totalQuestions} questions correctly.`;

      updateProgress();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  function updateProgress() {
    const progress = Math.min((answeredQuestions / totalQuestions) * 100, 100);
    const rotation = (progress / 100) * 440;
    progressCircle.style.strokeDashoffset = 440 - rotation;
    progressText.textContent = `${Math.round(progress)}%`;
  }
});
