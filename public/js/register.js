document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
  
    const userData = {
      username: form.username.value,
      password: form.password.value,
      credit_card: form.credit_card.value,
      cvv: form.cvv.value
    };
  
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        window.location.href = 'login.html';
      }
    } catch (err) {
      alert("Registration failed!");
      console.error(err);
    }
  });
  