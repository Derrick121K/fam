const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

let questions = [];
let scores = {};

app.post('/upload-question', upload.single('image'), (req, res) => {
    const questionData = {
        question: req.body.question,
        image: req.file ? req.file.path : null,
        answers: [
            req.body.answer1,
            req.body.answer2,
            req.body.answer3,
            req.body.answer4,
            req.body.answer5,
        ],
        correctAnswer: req.body.correctAnswer,
    };
    questions.push(questionData);
    res.status(200).send('Question uploaded successfully');
});

app.post('/join-game', (req, res) => {
    const teamName = req.body.teamName;
    if (!scores[teamName]) {
        scores[teamName] = 0;
    }
    res.status(200).send(`Team ${teamName} has joined the game`);
});

app.get('/questions', (req, res) => {
    res.json(questions);
});

app.get('/scores', (req, res) => {
    res.json(scores);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});