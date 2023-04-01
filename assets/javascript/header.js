var time = document.getElementById('time');
var day = document.getElementById('day');
const playpage = document.querySelector('.playcontainer');


// Current Time Display
setInterval(function updateTime() {
    time.textContent = dayjs().format('h:mm A');
},1);

//Current Day Display
setInterval(function updateDay() {
    day.textContent = dayjs().format('dddd M');
},1);

//album cover (placeholder) is showcased and css is added. 
let albumcover = document.createElement('img');
albumcover.setAttribute('src', './assets/imgs/placeholder.jpg' );
albumcover.setAttribute('alt', 'placeholder album cover image');
albumcover.classList.add('imgincenter');
playpage.appendChild(albumcover);

