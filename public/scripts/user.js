const userData = JSON.parse(localStorage.getItem('user'))
function LoadUserRooms () {
  const roomsList = document.querySelector('#rooms-list');
  roomsList.innerHTML = '';
  // console.log(`${window.location.origin}/users/${userData.id.trim()}/rooms`);
  fetch(`${window.location.origin}/users/${userData.id.trim()}/rooms`)
    .then(res => res.json())
    .then(res => {
      const rooms = res.data.items;
      rooms.forEach( room => {
        const li = document.createElement('li');
        li.textContent = room.name;
        li.classList.add('list-group-item');
        li.style.cursor = 'pointer';
        li.addEventListener('click', e => {
          localStorage.setItem('room', JSON.stringify(room));
          window.location.href = `${window.location.origin}/rooms/${room.id.trim()}`
        });
        roomsList.appendChild(li);

      })
    });

}
document.addEventListener('DOMContentLoaded', () => {
  // const registerForm = document.querySelector('.register');
  LoadUserRooms();
  const roomsList = document.querySelector('#createRoom');
  console.log(roomsList);
  roomsList.addEventListener('submit', e => {
    e.preventDefault();
    const room = {
      userId: userData.id,
      name: e.target.name.value,
      type: e.target.type.value
      // password: e.target.password.value || ''
    };
    console.log(room);
    fetch(window.location.origin + '/rooms', {
      method: 'POST',
      body: JSON.stringify(room),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(res => {
        // localStorage.setItem('user', JSON.stringify(res.data));
        LoadUserRooms();
      })
      .catch(err => {
        console.log(err)
      })
  })
  // fetch()
})
