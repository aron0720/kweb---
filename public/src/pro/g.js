const button = document.getElementById('ngButton');
button.addEventListener('click', () => {
    document.getElementById('container2').innerHTML = null;
    fetch('/pronn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gname: localStorage.getItem('gname'), id: localStorage.getItem('username') })
    })
        .then(response => response.json())
        .then(result => {
            createg(result.g.ginside);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

const button2 = document.getElementById('nButton');
button2.addEventListener('click', () => {
    document.getElementById('container2').innerHTML = null;
    const container = document.getElementById('container2');

    const b = document.createElement('a');
    b.innerText = '생성하기';
    b.classList.add('button', 'btnFloat', 'btnBlueGreen');

    const titleDiv = document.createElement('div');
    titleDiv.contentEditable = true;
    titleDiv.style.border = '3px solid #ccc';
    titleDiv.style.padding = '5px';
    titleDiv.style.height = '30px';
    titleDiv.style.overflowY = 'auto';
    titleDiv.innerText = '제목';

    const contentDiv = document.createElement('div');
    contentDiv.contentEditable = true;
    contentDiv.style.border = '3px solid #ccc';
    contentDiv.style.padding = '5px';
    contentDiv.style.height = '500px';
    contentDiv.style.overflowY = 'auto';
    contentDiv.innerText = '내용';

    b.addEventListener('click', () => {
        fetch('/pronnn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inside: titleDiv.innerText, insideText: contentDiv.innerText, gname: localStorage.getItem('gname'), id: localStorage.getItem('username') })
        })
            .then(response => response.json())
            .then(result => {
                container.innerHTML = '';
                container.innerText = '등록되었습니다.'
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    container.appendChild(titleDiv);
    container.appendChild(contentDiv);
    container.appendChild(b);
});

function createg(list) {
    container = document.getElementById('container2');
    if (list == []) container.innerText = '등록된 개시물이 없습니다.';
    else {
        list.forEach(element => {
            const button = document.createElement('a');
            button.innerText = element;
            button.href = './gg.html'
            button.addEventListener('click', () => {
                localStorage.setItem('ggname', element);
            })
            container.appendChild(button);
        });
    }
}