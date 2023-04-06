
const replayBtn = document.querySelector('#replaybtn')

const h1 = document.getElementById('h1');


const h1 = document.getElementById('h1');

const apiKey = 'AIzaSyCzwyCf3RyC5VDnQVV_zLp0mqzG3WVaUP8'; 
const apiALT = 'AIzaSyBb2hSfiyO0puJQ4dHLmWQjDYu3hgbmIzo';
const videoContainer = $('.video');
const videoClick = $('.click'); 

var playerUser = localStorage.getItem('Player Name:');
console.log(playerUser); 

h1.textContent = 'Nice Shiba-Nality, ' + playerUser + '! You might like this:';
const hide = $('.delete');



// replayBtn.addEventListener('click', replayQuiz);


function replayQuiz() {
  location.replace('./index.html');
}

let channel = [ //youtube channel list
  {
    lofiGirl: 'UCSJ4gkVC6NrvII8umztf0Ow'
  },
  {
    sunshine:'UC41BjlpB0ExhJFysKWf70xg'
  },
  {
    shiba: 'UCjlcOM4JaLoUbFWQ7j0LOKA'
  }
]

let video;


let score = localStorage.getItem('userScore'); // gets score from local storage


function scoreError(){
  $(videoContainer).append(`
    <div class='notification'>
    <button class="delete"></button>
    There was a error getting your score
    </div>`
  );
  return;
}

$(document).on('click', '.delete', function(e){
  e.preventDefault();
  $(videoContainer).empty();
})


if (score >= 38) { //if statement that gets channel id based on score, also clear local on load
  channelId = channel[2].shiba;
  console.log(channelId, score);
} else if (score >= 15 && score <= 37) {
  channelId = channel[1].sunshine;
  console.log(channelId, score);
} else if (score >= 1 && score <= 14){
  channelId = channel[0].lofiGirl;
  console.log(channelId, score);
} else {
  console.log('error loading score');
  scoreError();
}


$(document).on('click', '.delete', function(e){
  e.preventDefault();
  $(videoContainer).empty();
})


// api call grabs the most viewed videos, will need to make the search url dependent on the "score" the user gets to load different video recomendations
fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=viewCount&key=${apiKey}`, { 

})
.then(response => response.json())
.then(data => {
  console.log(data);
  video = data.items;
  loadThumbnails(video);
})
.catch(error => console.error(error)); //this section looks ugly as hell, but lets me set the api return into a global var to be used.



function loadThumbnails(video) { //loads videos of the pre-selected channel on page load. 
  video.forEach(video => { //this spits out errors.... but works....
    console.log(video.snippet.title);
    $(videoContainer).append(`
      <div class='video-container'>
        <h3 class='text'>${video.snippet.title}</h3>
        </div>
        <div>
          <iframe width= 50% height= 200% src="https://www.youtube.com/embed/${video.id.videoId}" style=" display: block; margin: 0 auto; margin-bottom: 2rem; margin-top: 1rem;">
          </iframe> 
        </div>`);
  });
  console.log(video);
}

loadThumbnails();