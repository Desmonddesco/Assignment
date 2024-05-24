Project Summary: The project is a user survey application that allows users to fill out a 
survey with their personal details and preferences. The survey results are then stored in 
a MySQL database, and users can view survey statistics such as total surveys completed, 
average age of participants, percentage of people who like certain foods, and average 
ratings for various activities.

Languages and Technologies Used:
1. HTML (HyperText Markup Language):
• Used for structuring the web pages (index.html, survey_results.html).

2. CSS (Cascading Style Sheets):
• Used for styling the web pages (style.css).

3. JavaScript:
• Used for client-side form validation and interaction (index.html, 
survey_results.html).
• Fetch API is used for making asynchronous requests to the server 
(index.html, survey.js).

4. Node.js with Express.js:
• Used for building the server-side application (survey.js).
• Express.js is a web application framework for Node.js, used for handling 
HTTP requests, routing, and serving static files.

5. MySQL (Structured Query Language):
• Used as the relational database management system for storing survey 
responses (survey.js).
• Queries are written in SQL to interact with the database (survey.js).

6. Firebase:
• Used for hosting the web Apllication.
• Firebase JavaScript SDK is included in the HTML file to initialize Firebase 
and interact with Firebase services.

7. Body-parser:
• Middleware used to parse JSON and urlencoded form data (survey.js).

8. Express.static:
• Middleware used to serve static files like CSS and JavaScript (survey.js).

Functionality:
• Filling out the Survey:
• Users can enter their personal information (like name, email, and contact 
number) and answer questions about their preferences (such as their 
favorite food and activities they enjoy).

• The web page checks if users have filled out all the required fields and if 
the data they entered is in the correct format (like a valid email address or 
phone number).
• Storing Survey Responses:
• After users submit their survey, their responses are stored in a database 

(MySQL). This way, we can keep track of all the answers and use them to 
generate statistics later.
• Analyzing Survey Data:
• The system calculates various statistics based on the survey responses, like 
the total number of surveys completed, the average age of participants, 
and the percentage of people who like certain foods or activities.

• These statistics are then displayed on the survey results page, so users can 
see interesting insights from the survey data.

Overall, this project is a fun and interactive way to gather information from
people through online surveys. It uses a combination of HTML, CSS, JavaScript,
Node.js, MySQL, and Firebase to create a user-friendly experience for both filling
out surveys and analyzing the collected data

Firebase demo link, Database is not working on demo, https://survey-111.web.app/
