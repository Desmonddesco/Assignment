document.addEventListener('DOMContentLoaded', () => {
    // Fetch survey statistics from the server
    fetch('/survey_results')
      .then(response => response.json())
      .then(data => {
        // Update HTML elements with survey statistics
        document.getElementById('totalCount').textContent = data.totalCount;
        document.getElementById('averageAge').textContent = data.averageAge;
        document.getElementById('oldestPerson').textContent = data.oldestPerson;
        document.getElementById('youngestPerson').textContent = data.youngestPerson;

        document.getElementById('pizzaPercentage').textContent = data.pizzaPercentage;
        document.getElementById('pastaPercentage').textContent = data.pastaPercentage;
        document.getElementById('papPercentage').textContent = data.papPercentage;
        
        document.getElementById('avgMoviesRating').textContent = data.avgMoviesRating;
        document.getElementById('avgRadioRating').textContent = data.avgRadioRating;
        document.getElementById('avgEatOutRating').textContent = data.avgEatOutRating;
        document.getElementById('avgTVRating').textContent = data.avgTVRating;

      })
      .catch(error => {
        console.error('Error fetching survey statistics:', error);
        // Update HTML elements to display an error message
        document.getElementById('error').textContent = 'Error fetching survey statistics';
      });
  });
  