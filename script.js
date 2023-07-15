const introElement = document.getElementById('intro');
const loginPanelElement = document.getElementById('login-panel');
const loginForm = document.querySelector('#login-form')
// console.log('loginForm', loginForm);

loginPanelElement.style.display = 'none' // dopisujemy aby nie było scrola

introElement.addEventListener('animationend', () => {
    introElement.style.display = 'none';
    loginPanelElement.style.display = 'inherit'; // domyslna inherit, aby nie było scrolla
    loginPanelElement.classList.add('login-fade-in');
})

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const username = document.getElementById('username').value // username z id z index html
    const password = document.getElementById('password').value

    if(username === 'sda123' && password === 'sda123') {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'secure-page.html'
    } else {
        alert('Nieprawidłowy login lub hasło!') // najlepiej dać informacje , ze jedno z dwóch jest niepoprawne - nie wskazuj co , bo np hakerzy mogą mieć łatwiejszy dostęp do informacji co było niepoprawne. 
    }
})