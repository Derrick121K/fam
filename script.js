document.getElementById('question-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const question = {
        question: document.getElementById('question').value,
        image: document.getElementById('question-image').files[0],
        answers: [
            document.getElementById('answer1').value,
            document.getElementById('answer2').value,
            document.getElementById('answer3').value,
            document.getElementById('answer4').value,
            document.getElementById('answer5').value,
        ],
        correctAnswer: document.getElementById('correct-answer').value,
    };

    const formData = new FormData();
    formData.append('question', question.question);
    formData.append('image', question.image);
    question.answers.forEach((answer, index) => {
        formData.append (`answer${index + 1}`, answer);
    });
    formData.append('correctAnswer', question.correctAnswer);

    fetch('/upload-question', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        // Optionally, clear the form or update the UI
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('join-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const teamName = document.getElementById('team-name').value;

    fetch('/join-game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName }),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        // Optionally, update the UI to show the team has joined
    })
    .catch(error => console.error('Error:', error));
});

// Function to fetch and display questions and scores
function fetchQuestions() {
    fetch('/questions')
        .then(response => response.json())
        .then(data => {
            const questionsContainer = document.getElementById('questions-container');
            questionsContainer.innerHTML = '';
            data.forEach(question => {
                const questionElement = document.createElement('div');
                questionElement.innerHTML = `<p>${question.question}</p>`;
                // Optionally display the image if it exists
                questionsContainer.appendChild(questionElement);
            });
        });
}

function fetchScores() {
    fetch('/scores')
        .then(response => response.json())
        .then(data => {
            const scoreContainer = document.getElementById('score-container');
            scoreContainer.innerHTML = '';
            for (const team in data) {
                const scoreElement = document.createElement('div');
                scoreElement.innerHTML = `<p>${team}: ${data[team]}</p>`;
                scoreContainer.appendChild(scoreElement);
            }
        });
}

// Call fetch functions to load data
fetchQuestions();
fetchScores();
