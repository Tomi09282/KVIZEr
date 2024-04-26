function createCardsFromCSV(csvData) {
  /*
  ENL on top, szemedbe hozok port
  But I miss UK, deliverin' box
  Annyit tudok, hogy stickin' up plugs
  Amíg otthon szívtál, én kosaraztam
  Had me back on the block, like livin' with thugs
  How we made those P's for dinner and lunch
  */
  var rows = csvData.split('\n');

  
  rows = shuffleArray(rows.slice(1));

  
  rows.forEach(row => {
      
      var cells = row.split(';');

      
      var topic = cells[0];
      var s1 = cells[1];
      var s2 = cells[2];
      var s3 = cells[3];
      var pic1 = cells[4];
      var pic2 = cells[5];
      var pic3 = cells[6];

      
      createCard(topic, s1, pic1, s2, pic2, s3, pic3);
  });
}

function createCard(topic, correctS, correctPic, incorrectS) {
  var card = document.createElement('div');
  card.className = 'card';

  var heading = document.createElement('h1');
  heading.textContent = topic;

  var questionImg = document.createElement('img');
  questionImg.src = 'images/' + correctPic;

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


function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


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

  function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  