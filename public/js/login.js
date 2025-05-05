document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      username: document.getElementById('username').value.trim(),
      password: document.getElementById('password').value
    };
  
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const result = await res.json();
      if (res.ok) {
        alert('Login successful!');
        window.location.href = '/index';
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert('Login error!');
    }
  });
  