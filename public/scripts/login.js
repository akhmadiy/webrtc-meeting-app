document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const payload = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        console.log(payload);
    });
});
