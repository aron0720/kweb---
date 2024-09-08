const button = document.getElementById('loginButton');
button.addEventListener('click', () => {
    const id = document.getElementById('idbox').value;
    const password = document.getElementById('passwordbox').value;
    
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, password: password })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result.message);
        localStorage.setItem('username', result.user.id);
        if (result.user.student === true) {
            const button = document.createElement('a');
            button.href = '../stu/stu.html';
            button.click();
        }
        else {
            const button = document.createElement('a');
            button.href = '../pro/pro.html';
            button.click();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});