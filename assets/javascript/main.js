
const apiKey = 'AIzaSyCzwyCf3RyC5VDnQVV_zLp0mqzG3WVaUP8';
const videoContainer = $('.video');
const videoClick = $('.click'); 

let channel = [ //channel list
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

const score = 5 //json.parse(localStorage.getItem('saveScore')); // gets score from local storage



if (score >= 8) { //if statement that gets channel id based on score 
  channelId = channel[2].shiba;
  console.log(channelId);
} else if (score >= 4 && score <= 7) {
  channelId = channel[1].sunshine;
  console.log(channelId);
} else if (score <= 3){
  channelId = channel[0].lofiGirl;
  console.log(channelId);
} else {
  console.log('error')
}

// api call grabs top 3 most viewed videos, will need to make the search url dependent on the "score" the user gets to load different video recomendations
fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=3&order=viewCount&key=${apiKey}`, { 
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
          <iframe width="1280" height="720" src="https://www.youtube.com/embed/${video.id.videoId}">
          </iframe> 
        </div>`);
  });
  console.log(video);
}


//THIS FUNCTION IS NOW REDUNDENT
//function that makes the clicked thumbnail a webplayer
// $(document).on('click', '.click', function playVideo(e){ //running this function spits out so many errors...... but it works, so oh well
//   e.preventDefault(); 
//   const index = $(this).index('.click');
//   const selectedVideo = video[index];
//   $(videoContainer).empty();
//   $(videoContainer).append(`
//     <div>
//       <h3 class='text'>${selectedVideo.snippet.title}</h3>
//       <iframe width="1280" height="720" src="https://www.youtube.com/embed/${selectedVideo.id.videoId}">
//       </iframe> 
//     </div>
//   `);
// });


loadThumbnails();