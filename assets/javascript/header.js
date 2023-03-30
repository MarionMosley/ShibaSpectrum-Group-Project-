var time = document.getElementById('time');
var day = document.getElementById('day');

// Current Time Display
setInterval(function updateTime() {
    time.textContent = dayjs().format('h:mm A');
},1000);

//Current Day Display
setInterval(function updateDay() {
    day.textContent = dayjs().format('M dddd');
},1000);

