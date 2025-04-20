function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById('login-email').value.split("@")[0];
  localStorage.setItem('username', username);
  window.location.href = 'index.html';
}

function signupUser(event) {
  event.preventDefault();
  const username = document.getElementById('signup-username').value;
  localStorage.setItem('username', username);
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const authButton = document.getElementById('authButton');
  const username = localStorage.getItem('username');
  if (authButton) {
    if (username) {
      authButton.innerHTML = `<span style="font-weight:bold;">Welcome, ${username}</span> <button onclick="logout()">Logout</button>`;
    } else {
      authButton.innerHTML = '<a href="login.html" class="login-button">Login / Signup</a>';
    }
  }

  const greeting = document.getElementById('personalGreeting');
  if (greeting && username) {
    greeting.innerHTML = `Nice to see you, <strong>${username}</strong>! Ready to explore?`;
  }
});

function logout() {
  localStorage.removeItem('username');
  window.location.reload();
}
