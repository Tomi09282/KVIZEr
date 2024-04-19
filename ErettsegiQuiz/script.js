document.getElementById('fileInput').addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  
  var reader = new FileReader();
  
  reader.onload = function(event) {
    var csvData = event.target.result;
    var rows = csvData.split('\n');
    var output = document.getElementById('output');
    output.innerHTML = '';

    for (var i = 1; i < rows.length; i++) { // start from 1 to skip the header row
      var cells = rows[i].split(';'); // assuming ';' is the delimiter
      var question = cells[0];
      var sentence1 = cells[1];
      var sentence2 = cells[2];
      var picture1 = 'Images/' + cells[3]; // Correct path for picture1
      var picture2 = 'Images/' + cells[4]; // Correct path for picture2
      var picture3 = 'Images/' + cells[5];


      var card = document.createElement('div');
      card.className = 'card';

      var heading = document.createElement('h1');
      heading.textContent = question;

      var img1 = document.createElement('img');
      img1.src = picture1;

      var img2 = document.createElement('img');
      img2.src = picture2;

      var img3 = document.createElement('img');
      img3.src = picture3;

      var buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'buttons';

      var button1 = document.createElement('button');
      button1.textContent = sentence1;

      var button2 = document.createElement('button');
      button2.textContent = sentence2;

      if (sentence1 && sentence2) {
        button1.addEventListener('click', function() {
          checkSentences(this, button2);
        });

        button2.addEventListener('click', function() {
          checkSentences(button1, this);
        });
      }

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

function checkSentences(button1, button2) {
  if (button1.textContent === button2.textContent) {
    button1.classList.add('correct');
    button2.classList.add('correct');
  } else {
    button1.classList.add('incorrect');
    button2.classList.add('incorrect');
  }

  var buttons = document.querySelectorAll('.buttons button');
  buttons.forEach(function(button) {
    button.disabled = true;
  });
}