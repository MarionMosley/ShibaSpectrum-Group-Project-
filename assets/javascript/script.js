var time = document.getElementById('time');

setInterval(function updateTime() {
    time.textContent = dayjs().format('h:mm');
},1000);

