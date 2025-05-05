document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
  
    const loginData = {
      username: form.username.value,
      password: form.password.value
    };
  
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        window.location.href = 'index.html';
      }
    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  });  