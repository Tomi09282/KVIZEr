
document.getElementById('fileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    
    var reader = new FileReader();
    // Tudod a név  az Tobak Patrik nagyon veszélyes és ki fogsz kapni
    reader.onload = function(event) {
      var csvData = event.target.result;
      var rows = csvData.split('\n');
      var output = document.getElementById('output');
      output.innerHTML = '';

      for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].split(';');
        var question = cells[0];
        var answer1 = cells[1];
        var answer2 = cells[2];
        var correctAnswer = cells[3];
        var picture1 = cells[4];
        var picture2 = cells[5];
        var picture3 = cells[6];

        var card = document.createElement('div');
        card.className = 'card';

        var heading = document.createElement('h1');
        heading.textContent = question;

        var img1 = document.createElement('img');
        img1.src = `images/${picture1}`;

        var img2 = document.createElement('img');
        img2.src = `images/${picture2}`;

        var img3 = document.createElement('img');
        img3.src = `images/${picture3}`;

        var buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        var button1 = document.createElement('button');
        button1.textContent = answer1;

        var button2 = document.createElement('button');
        button2.textContent = answer2;

        button1.addEventListener('click', function() {
          checkAnswer(this.textContent, correctAnswer);
        });

        button2.addEventListener('click', function() {
          checkAnswer(this.textContent, correctAnswer);
        });

        buttonsDiv.appendChild(button1);
        buttonsDiv.appendChild(button2);

        card.appendChild(heading);
        card.appendChild(img1);
        card.appendChild(img2);
        card.appendChild(img3);
        card.appendChild(buttonsDiv);

        output.appendChild(card);
      }
    };
    
    reader.readAsText(file);
  });

  function checkAnswer(selectedAnswer, correctAnswer) {
    var buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(function(button) {
      if (button.textContent === correctAnswer) {
        button.classList.add('correct');
      } else {
        button.classList.add('incorrect');
      }
      button.disabled = true;
    });
  }