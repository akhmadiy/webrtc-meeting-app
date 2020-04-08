
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('.register');

  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      fullname: e.target.fullname.value,
      password: e.target.password.value
    };
    console.log(user);
    fetch(window.location.href, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      if(res.msg === 'ok'){
        window.location.href = '/users/' + res.data.id;
      }
    })
    .catch(err => {
      console.log(err);
    })
  });
  
});