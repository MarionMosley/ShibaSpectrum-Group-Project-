var time = document.getElementById('time');
var day = document.getElementById('day');

// Current Time Display
setInterval(function updateTime() {
    time.textContent = dayjs().format('h:mm A');
},1);

//Current Day Display
setInterval(function updateDay() {
    day.textContent = dayjs().format('dddd M');
},1);

