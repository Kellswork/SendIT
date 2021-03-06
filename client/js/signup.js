
function signUp() {
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

  return fetch(url, options)
    .then(res => res.json())
    .catch((error) => {
      console.log(error.message);
    });
}

const signupbtn = document.querySelector('.signupbtn');
signupbtn.addEventListener('click', (event) => {
  event.preventDefault();
  signUp();
});
