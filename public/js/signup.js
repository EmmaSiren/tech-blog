const signupFormHandler = async (event) => {
  event.preventDefault();

  const inputUsername = document.querySelector('#inputUsername').value.trim();
  const inputPassword = document.querySelector('#inputPassword').value.trim();

  if (inputUsername && inputPassword) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: inputUsername, 
        password: inputPassword
      }),
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    }else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
