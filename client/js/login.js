
function login() {
  const div = document.getElementById('err');
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const url = 'http://localhost:8080/api/v1/auth/login';

  const data = {
    email,
    password,
  };
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  };
  const request = async () => {
    const response = await fetch(url, options);
    const json = await response.json();
    div.innerHTML = '';
    if (json.error) {
      if (Array.isArray(json.error)) {
        json.error.forEach((element) => {
          const content = `<p>${element}</p>`;
          div.style.display = 'block';
          div.innerHTML += content;
        });
      } else div.innerHTML = `<p> ${json.error} </p>`;
    }
    if (json.success === true) {
      div.style.display = 'none';
      window.location.href = 'order.html';
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
    console.log(json);
  };

  request();
}

const loginBtn = document.querySelector('.loginbtn');
loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  login();
});
