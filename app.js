const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const adminroute = require('./routes/admin.js');
const userroute = require('./routes/user.js');
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname,'script')));
app.use(userroute)
app.use('/admin',adminroute);

app.listen(8080);


//

// app.js (or your main server file

// Other routes...

app.get('/quiz', (req, res) => {
  res.render('quiz'); // Render the quiz template
});


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/quiz', (req, res) => {
  res.render('quiz'); // Render the quiz template
});

app.post('/submit-quiz', (req, res) => {
  const answers = req.body;
  const correctAnswers = {
    q1: 'Paris',
    q2: '4',
    q3: '3',
    q4: '1',
    q5: '2'
  };

  let score = 0;
  let totalQuestions = Object.keys(correctAnswers).length;
  for (const key in correctAnswers) {
    if (answers[key] === correctAnswers[key]) {
      score += 1;
    }
  }
res.render('quizresult',{
  marks:score
});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
