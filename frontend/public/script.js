document.addEventListener('DOMContentLoaded', () => {
    let quizzes = [];
    let currentQuiz = 0;
    let score = 0;
  
    fetch('/api/quiz')
      .then(response => response.json())
      .then(data => {
        quizzes = data;
        showQuiz();
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  
    function showQuiz() {
      const quiz = quizzes[currentQuiz];
      document.getElementById('question-count').innerText = `Question ${currentQuiz + 1}/${quizzes.length}`;
      document.getElementById('question-text').innerText = quiz.question;
      const answerSection = document.getElementById('answer-section');
      answerSection.innerHTML = '';
      quiz.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.answerText;
        button.addEventListener('click', () => handleAnswerOptionClick(answer.isCorrect));
        answerSection.appendChild(button);
      });
    }
  
    function handleAnswerOptionClick(isCorrect) {
      if (isCorrect) {
        score++;
      }
  
      currentQuiz++;
      if (currentQuiz < quizzes.length) {
        showQuiz();
      } else {
        showScore();
      }
    }
  
    function showScore() {
      document.getElementById('quiz-section').style.display = 'none';
      document.getElementById('score-section').style.display = 'block';
      document.getElementById('score').innerText = score;
      document.getElementById('total').innerText = quizzes.length;
    }
  });