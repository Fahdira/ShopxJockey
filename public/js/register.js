document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const data = {
      username: document.getElementById('username').value.trim(),
      password: document.getElementById('password').value,
      creditCard: document.getElementById('creditCard').value,
      cvv: document.getElementById('cvv').value,
    };
  
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const result = await res.json();
      if (res.ok) {
        alert('Registration successful!');
        window.location.href = '/login';
      } else {
        alert(result.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('An error occurred.');
    }
  });
  