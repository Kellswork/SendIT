
function signUp() {
  const div = document.getElementById('err');
  const firstName = document.querySelector('#firstname').value;
  const lastName = document.querySelector('#lastname').value;
  const userName = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const phoneNumber = document.querySelector('#phonenumber').value;
  const url = 'http://localhost:8080/api/v1/auth/signup';

  const data = {
    firstName,
    lastName,
    userName,
    email,
    password,
    phoneNumber,
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
    if (json.success === false) {
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
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
    console.log(json);
  };

  request();
}

const signupbtn = document.querySelector('.signupbtn');
signupbtn.addEventListener('click', (event) => {
  event.preventDefault();
  signUp();
});
