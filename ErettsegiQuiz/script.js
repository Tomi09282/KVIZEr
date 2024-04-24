function createCardsFromCSV(csvData) {
  // Split the CSV data into an array of rows
  var rows = csvData.split('\n');

  // Shuffle the rows (excluding the header row)
  rows = shuffleArray(rows.slice(1));

  // Process each row
  rows.forEach(row => {
      // Split the row into an array of cells
      var cells = row.split(';');

      // Extract the topic, s values, and picture URLs from the cells
      var topic = cells[0];
      var s1 = cells[1];
      var s2 = cells[2];
      var s3 = cells[3];
      var pic1 = cells[4];
      var pic2 = cells[5];
      var pic3 = cells[6];

      // Create a card for the topic with the correct and incorrect s values and their corresponding pictures
      createCard(topic, s1, pic1, s2, pic2, s3, pic3);
  });
}

function createCard(topic, correctS, correctPic, incorrectS) {
  var card = document.createElement('div');
  card.className = 'card';

  var heading = document.createElement('h1');
  heading.textContent = topic;

  var questionImg = document.createElement('img');
  questionImg.src = correctPic;

  var correctButton = createButton(correctS, true);
  var incorrectButton = createButton(incorrectS, false);

  card.appendChild(heading);
  card.appendChild(questionImg);

  if (randomIntFromInterval(1, 2) == 1) {
    card.appendChild(correctButton);
    card.appendChild(incorrectButton);
  } else{
    card.appendChild(incorrectButton);
    card.appendChild(correctButton);
  }


  document.getElementById('output').appendChild(card);
}

function createButton(text, isCorrect) {
  var button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', function() {
      checkAnswer(this, isCorrect);
  });
  return button;
}

function checkAnswer(clickedButton, isCorrect) {
  var buttons = clickedButton.parentNode.querySelectorAll('button');
  buttons.forEach(function(button) {
      if (button === clickedButton) {
          if (isCorrect) {
              button.classList.add('correct');
          } else {
              button.classList.add('incorrect');
          }
      } else {
          button.classList.add('incorrect');
      }
      button.disabled = true;
  });
}

// Helper function to shuffle array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Fetch the CSV file nibba
fetch('data/data.csv')
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to fetch the CSV file.');
      }
      return response.text();
  })
  .then(csvData => {
      createCardsFromCSV(csvData);
  })
  .catch(error => {
      console.error('An error occurred while fetching the CSV file:', error);
  });

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  