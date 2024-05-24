const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Gerson.66',
  database: 'user_survey'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Check if the email already exists in the database
  const checkEmailQuery = 'SELECT COUNT(*) AS count FROM SurveyResponses WHERE email = ?';
  db.query(checkEmailQuery, [formData.email], (err, result) => {
    if (err) {
      console.error('Error checking email:', err);
      res.status(500).send('Error checking email');
      return;
    }
    const emailExists = result[0].count > 0;
    if (emailExists) {
      res.status(400).send('Email already used');
      return;
    }

    const sql = 'INSERT INTO SurveyResponses (name, email, date, contact_number, food, watch_movies, listen_radio, eat_out, watch_tv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      formData.name,
      formData.email,
      formData.date,
      formData.contact_number,
      JSON.stringify(formData.food), // Assuming formData.food is an array of selected food items
      formData.watch_movies,
      formData.listen_radio,
      formData.eat_out,
      formData.watch_tv
    ];

    // Execute the SQL query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
        return;
      }
      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    });
  });
});

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the CSS file
app.get('/css/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'css', 'style.css'));
});

// Route to serve the survey_results.html file and fetch survey statistics
app.get('/survey_results', (req, res) => {

  // Query to get total number of surveys
  const totalCountQuery = 'SELECT COUNT(*) AS totalCount FROM SurveyResponses';
  db.query(totalCountQuery, (err, totalCountResult) => {
    if (err) {
      console.error('Error fetching total count:', err);
      res.status(500).send('Error fetching total count');
      return;
    }
    const totalCount = totalCountResult[0].totalCount;

    // Query to calculate average age
    const averageAgeQuery = 'SELECT AVG(DATEDIFF(NOW(), STR_TO_DATE(date, "%Y-%m-%d"))) AS averageAge FROM SurveyResponses';
    db.query(averageAgeQuery, (err, averageAgeResult) => {
      if (err) {
        console.error('Error fetching average age:', err);
        res.status(500).send('Error fetching average age');
        return;
      }
      const averageAgeindays = averageAgeResult[0].averageAge;
      const  averageAge = Math.floor(averageAgeindays / 365);

      // Query to find oldest person
      const oldestPersonQuery = 'SELECT MAX(DATEDIFF(NOW(), STR_TO_DATE(date,  "%Y-%m-%d"))) AS oldestPerson FROM SurveyResponses';
      db.query(oldestPersonQuery, (err, oldestPersonResult) => {
        if (err) {
          console.error('Error fetching oldest person:', err);
          res.status(500).send('Error fetching oldest person');
          return;
        }
        const oldestPersondays = oldestPersonResult[0].oldestPerson;
        const oldestPerson = Math.floor(oldestPersondays / 365) + ' Years old';

        // Query to find youngest person
        const youngestPersonQuery = 'SELECT MIN(DATEDIFF(NOW(), STR_TO_DATE(date,  "%Y-%m-%d"))) AS youngestPerson FROM SurveyResponses';
        db.query(youngestPersonQuery, (err, youngestPersonResult) => {
          if (err) {
            console.error('Error fetching youngest person:', err);
            res.status(500).send('Error fetching youngest person');
            return;
          }
          const youngestPersondays = youngestPersonResult[0].youngestPerson;
          const youngestPerson = Math.floor(youngestPersondays / 365) + ' Years old';

          // Query to calculate percentage of people who like pizza
          const pizzaPercentageQuery = 'SELECT COUNT(*) AS pizzaCount FROM SurveyResponses WHERE food LIKE "%Pizza%"';
          db.query(pizzaPercentageQuery, (err, pizzaPercentageResult) => {
            if (err) {
              console.error('Error fetching pizza percentage:', err);
              res.status(500).send('Error fetching pizza percentage');
              return;
            }
            const pizzaCount = pizzaPercentageResult[0].pizzaCount;
            const pizzaPercentage = (pizzaCount / totalCount * 100).toFixed(1)+ '%';

             // Query to calculate percentage of people who like pasta
          const pastaPercentageQuery = 'SELECT COUNT(*) AS pastaCount FROM SurveyResponses WHERE food LIKE "%Pasta%"';
          db.query(pastaPercentageQuery, (err, pastaPercentageResult) => {
            if (err) {
              console.error('Error fetching pasta percentage:', err);
              res.status(500).send('Error fetching pasta percentage');
              return;
            }
            const pastaCount = pastaPercentageResult[0].pastaCount;
            const pastaPercentage = (pastaCount / totalCount * 100).toFixed(1)+ '%';

            // Query to calculate percentage of people who like pap and wors
          const papPercentageQuery = 'SELECT COUNT(*) AS papCount FROM SurveyResponses WHERE food LIKE "%Pap&Wors%"';
          db.query(papPercentageQuery, (err, papPercentageResult) => {
            if (err) {
              console.error('Error fetching pap and wors percentage:', err);
              res.status(500).send('Error fetching pap and wors percentage');
              return;
            }
            const papCount = papPercentageResult[0].papCount;
            const papPercentage = (papCount / totalCount * 100).toFixed(1)+ '%';

            // Query to calculate average rating for people who like to eat out
            const avgEatOutRatingQuery = 'SELECT AVG(eat_out) AS avgEatOutRating FROM SurveyResponses';
            db.query(avgEatOutRatingQuery, (err, avgEatOutRatingResult) => {
              if (err) {
                console.error('Error fetching average eat out rating:', err);
                res.status(500).send('Error fetching average eat out rating');
                return;
              }
              const avgEatOutRating = avgEatOutRatingResult[0].avgEatOutRating.toFixed(1);

               // Query to calculate average rating for people who like to watch movies
            const avgMoviesRatingQuery = 'SELECT AVG(watch_movies) AS avgMoviesRating FROM SurveyResponses';
            db.query(avgMoviesRatingQuery, (err, avgMoviesRatingResult) => {
              if (err) {
                console.error('Error fetching average movies rating:', err);
                res.status(500).send('Error fetching average movies rating');
                return;
              }
              const avgMoviesRating = avgMoviesRatingResult[0].avgMoviesRating.toFixed(1);

              // Query to calculate average rating for people who like to  listern to radio
            const avgRadioRatingQuery = 'SELECT AVG(listen_radio) AS avgRadioRating FROM SurveyResponses';
            db.query(avgRadioRatingQuery, (err, avgRadioRatingResult) => {
              if (err) {
                console.error('Error fetching average radio listening rating:', err);
                res.status(500).send('Error fetching average radio listening rating');
                return;
              }
              const avgRadioRating = avgRadioRatingResult[0].avgRadioRating.toFixed(1);

              // Query to calculate average rating for people who like to watch TV
            const avgTVRatingQuery = 'SELECT AVG(watch_tv) AS avgTVRating FROM SurveyResponses';
            db.query(avgTVRatingQuery, (err, avgTVRatingResult) => {
              if (err) {
                console.error('Error fetching average watching tv rating:', err);
                res.status(500).send('Error fetching average watching tv  rating');
                return;
              }
              const avgTVRating = avgTVRatingResult[0].avgTVRating.toFixed(1);

              // Send survey results data as JSON
              res.json({
                totalCount,
                averageAge,
                oldestPerson,
                youngestPerson,
                pizzaPercentage,
                papPercentage,
                pastaPercentage,
                avgEatOutRating,
                avgMoviesRating,
                avgRadioRating,
                avgTVRating

              });
            });
          });
        });
      });
    });
  });
});
});
});
});
});
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
