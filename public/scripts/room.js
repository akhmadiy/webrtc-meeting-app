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
});

function endCall() {
  roomSocket.disconnect();
  window.location.href = '/users/register'
}