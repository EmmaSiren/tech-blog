const loginFormHandler = async () => {
  const username = document.querySelector('#inputUsername').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    }else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
