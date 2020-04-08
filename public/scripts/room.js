
const userData = JSON.parse(localStorage.getItem('user'))
const roomData = JSON.parse(localStorage.getItem('room'))

const roomSocket = io(window.location.origin);

roomSocket.on('connect', () => {
  console.log('socket connected');
  
});

roomSocket.on('joined', (data) => {
  console.log(data);
})
roomSocket.emit('join', {msg: 'hello', roomId: roomData.id});
