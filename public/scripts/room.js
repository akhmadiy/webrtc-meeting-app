const userData = JSON.parse(localStorage.getItem('user'));
const roomData = JSON.parse(localStorage.getItem('room'));

const roomSocket = io(window.location.origin);
console.log(userData);
roomSocket.on('connect', () => {
  console.log('socket connected', 'room js');
  roomSocket.on('joined', (data) => {
    console.log(data);
  })
});


roomSocket.emit('join', {
  msg: 'hello',
  roomId: roomData.id
});


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('roomName').innerHTML = roomData.name;
  let streams = [...document.getElementsByClassName('streams')];
  console.log(streams.length);
  streams.map(item => {
    if (!item.srcObject) {
      console.log('ok');
      const li = document.createElement('li');
      li.classList.add("fas");
      li.classList.add("fa-user");
      li.classList.add("icon");
      li.classList.add("mt-5");
      li.classList.add("mb-5");
      item.innerHTML = '';
      item.appendChild(li);
    }
  });
});

function endCall() {
  roomSocket.disconnect();
  window.location.href = '/users/login'
}