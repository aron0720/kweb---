const button = document.getElementById('gButton');
button.addEventListener('click', () => {
    fetch('/pro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: localStorage.getItem('username') })
    })
        .then(response => response.json())
        .then(result => {
            if (result.user.g === null) document.getElementById('container2').innerText = '등록된 강의가 없습니다.';
            else createg(result.user.g);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

const button2 = document.getElementById('nButton');
button2.addEventListener('click', () => {
    document.getElementById('container2').innerHTML = null;
    const contaier = document.getElementById('container2');

    const b = document.createElement('a');
    b.innerText = '생성하기';
    b.classList.add('button', 'btnFloat', 'btnBlueGreen');
    
    const t = document.createElement('input');
    t.type = 'text';

    b.addEventListener('click', () => {
        const text = t.value;
        fetch('/pron', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ n: text, username: localStorage.getItem('username')})
        })
            .then(response => response.json())
            .then(result => {
                contaier.innerHTML = '';
                contaier.innerText = '추가되었습니다.'
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })

    contaier.appendChild(t);
    contaier.appendChild(b);
    
});

function createg(list) {
    const container = document.getElementById('container2');
    container.innerHTML = '';
    list.forEach(element => {
        const button = document.createElement('a');
        button.innerText = element;
        button.href = './g.html'
        button.addEventListener('click', () => {
            localStorage.setItem('gname', element);
        })
        container.appendChild(button);
    });
    
}