let studentbox = document.getElementById('studentbox');
let professorbox = document.getElementById('professorbox')
document.getElementById('studentbox').checked = true;
document.getElementById('studentbox').addEventListener('change', () => {
    if (professorbox.checked === true) professorbox.checked = false;
    else professorbox.checked = true;
})
document.getElementById('professorbox').addEventListener('change', () => {
    if (studentbox.checked === true) studentbox.checked = false;
    else studentbox.checked = true;
})


const button = document.getElementById('sign_upButton');
button.addEventListener('click', () => {
    const id = document.getElementById('idbox').value;
    const password = document.getElementById('passwordbox').value;
    const number = document.getElementById('numberbox').value;
    const name = document.getElementById('namebox').value;
    let student = null;
    if (document.getElementById('studentbox').checked) student = true;
    else student = false; 

    fetch('/sign_up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, password: password, number: number, name: name, student: student })
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('container2').innerHTML = null;
        document.getElementById('container2').innerText = '환영합니다.';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});