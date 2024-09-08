document.getElementById('gButton').addEventListener('click', () => {
    document.getElementById('container2').innerHTML = null;
    fetch('/stu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: localStorage.getItem('username') })
    })
        .then(response => response.json())
        .then(result => {
            createg(result.list);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

function createg(list) {
    const container = document.getElementById('container2');
    container.innerHTML='';
    if (list === null) container.innerText = '등록된 강의가 없습니다.'
    else {
        list.forEach(element => {
            const button = document.createElement('a');
            button.innerText = element;
            button.addEventListener('click', () => {
                localStorage.setItem('gname', element);
                creategg();
            })
            container.appendChild(button);
        });
    }
}

function creategg() {
    const container = document.getElementById('container2');
    container.innerHTML='';
    fetch('/stun', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: localStorage.getItem('username') , id2: localStorage.getItem('gname')})
    })
        .then(response => response.json())
        .then(result => {
            createggg(result.list);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createggg(list) {
    const container = document.getElementById('container2');
    container.innerHTML='';
    if (list === null) container.innerText = '등록된 강의가 없습니다.'
    else {
        list.forEach(element => {
            const button = document.createElement('a');
            button.innerText = element;
            button.addEventListener('click', () => {
                localStorage.setItem('ggname', element);
                creategggg();
            })
            container.appendChild(button);
        });
    }
}

function creategggg() {
    fetch('/stunn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: localStorage.getItem('username') , id2: localStorage.getItem('gname'), title: localStorage.getItem('ggname')})
    })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'done') {
                alert('신청 완료');
            } else {
                alert('이미 신청된 강의입니다.')
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById('nButton').addEventListener('click', () => {
    document.getElementById('container2').innerHTML = null;
    fetch('/stuu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: localStorage.getItem('username') })
    })
        .then(response => response.json())
        .then(result => {
            createu(result.list);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

function createu(list) {
    const container = document.getElementById('container2');
    container.innerHTML='';
    if (list === null) container.innerText = '등록된 강의가 없습니다.'
    else {
        list.forEach(element => {
            const button = document.createElement('a'); 
            button.innerText = element;

            button.addEventListener('click', () => {
                createuu(element);
            });
            
            container.appendChild(button);
        });
    }
}

function createuu(a) {
    const container = document.getElementById('container2');
    container.innerHTML='';
    const [inside, pro] = a.split('-');
    fetch('/stuuu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inside: inside, pro: pro })
    })
        .then(response => response.json())
        .then(result => {
            localStorage.setItem('gname', pro);
            localStorage.setItem('ggname', inside);
            createuuu(result.list);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function createuuu(list) {
    const container = document.getElementById('container2');
    container.innerHTML = '';

    if (list === null || list.length === 0) {
        container.innerText = '등록된 강의가 없습니다.';
    } else {
        list.forEach(element => {
            const button = document.createElement('a'); 
            button.innerText = element;

            button.addEventListener('click', () => {
                createuuuu(element);
            });
            
            container.appendChild(button);
        });
    }
}

function createuuuu(a) {
    const container = document.getElementById('container2');
    container.innerHTML = '';
    fetch('/stuuuu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inside: a, pro: localStorage.getItem('gname'), title: localStorage.getItem('ggname') })
    })
        .then(response => response.json())
        .then(result => {
            container.innerText = result.text;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}