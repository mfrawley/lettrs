var displayDiv = document.querySelector('#letter-display');
var nextBtn = document.querySelector('#next');
//flickr
var apiKey = '806ad81c669b2564638fadc1a5fa3199';
var perPage = '25';
var showOnPage = '25';
var speakingInProgress = false;

var fetchImage = function(tag) {
  var getPhotoUrl = function(photo) {
    var basePhotoURL = 'https://farm' + photo.farm + '.static.flickr.com/'
            + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
    return basePhotoURL;
  }
  var jsonFlickrApi = function(data) {
    console.log(data);
    var photo = data.photos.photo[0];
    var photo1 = data.photos.photo[1];
    document.getElementById('word_image').setAttribute('src', getPhotoUrl(photo));
    document.getElementById('word_two').setAttribute('src', getPhotoUrl(photo1));
  }
  var url = 'https://api.flickr.com/services/rest/?format=json&method='+
      'flickr.photos.search&api_key=' + apiKey +
      '&tags=' + tag + '&per_page=' + perPage

  fetch(url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        console.log(response.text().then(function(t) {
          eval(t);
          speakingInProgress=false;
        }));
        // Examine the text in the response
        // response.json().then(function(data) {
        //   console.log(data);
        //
        // });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
};

var displayIt = function(msg) {
  displayDiv.innerText = msg;
};

var getRandom = function(things)  {
  return things[Math.floor(Math.random()*things.length)];
};

var spellWord = function(word) {

  fetchImage(word);
  for(var i=0; i < word.length; i++) {
    speakLetterAtIndex(word, i);
  }
  speakString("That spells: " + word);
};

var speakLetterAtIndex = function(word, i) {
  var msg = new SpeechSynthesisUtterance(word[i]);
  msg.lang = 'en-UK';
  msg.onstart = function(e) {
    highlightLetter(i);
  }
  msg.onend = function(e) {
    unHighlightLetter(i);
  }
  speechSynthesis.speak(msg);
};

var speakString = function(msg) {
  var msg = new SpeechSynthesisUtterance(msg);
  msg.lang = 'en-UK';
  speechSynthesis.speak(msg);
};

var singleLetterGame = function() {
  var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O','P','Q','R','S','T','U','V','W','X','Y', 'Z'];
  var letter = getRandomLetter(letters);
  displayIt(letter);
  speakString(letter);
}

var displayWithSpansPerLetter = function(word) {
  var s = '';
  for(var i=0; i < word.length; i++) {
    s += '<span id="letter_'+i+'">'+word[i]+'</span>';
  }
  document.querySelector('#letter-display').innerHTML = s;
}

var highlightLetter = function(i) {
  document.querySelector('#letter_' + i).setAttribute('class', 'active');
};

var unHighlightLetter = function(i) {
  document.querySelector('#letter_' + i).setAttribute('class', 'inactive');
};

var highlightedLetterGame = function() {
    var randomWord = getRandom(['cat', 'dog', 'pig', 'sky', 'fly', 'my',
    'dad', 'mama', 'emily', 'maeve', 'bird', 'car', 'fish', 'Grandad',
    'Joanne', 'Mark', 'Sandra', 'Simba', 'Kion', 'dinosaur',
  'cow', 'tree', 'bush', 'brush', 'chair', 'table', 'knife','fork',
  'spoon', 'light', 'food', 'drink', 'ball', 'beach', 'hot', 'sun',
  'monkey', 'lion']);
    displayWithSpansPerLetter(randomWord);
    spellWord(randomWord);
};

function main() {
  //singleLetterGame();
  highlightedLetterGame();

  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (!speakingInProgress) {
      speakingInProgress = true;
      highlightedLetterGame();
    }
  });
}
main();
