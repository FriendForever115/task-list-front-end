let id_task = null

window.onload = () => {
    const url = new URL(window.location.href);
    id_task = url.searchParams.get('id_task');

    fetch(`http://localhost:3000/user/task/get_task/${id_task}`, {
            method: 'GET',
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(task => {
            document.querySelector("#text_task_text").value = task[0].task_text;
            console.log(task[0].task_text);
        })
}

document.querySelector("#btn_atualizar").addEventListener('click', () => {

    let task_text = document.querySelector("#text_task_text").value;
    let error = document.querySelector("#error");

    if (task_text == null || task_text == '') {
        error.textContent = "Preencha o campo de texto!";
        error.classList.remove("d-none")
        return;
    }

    if (task_text.length > 100) {
        error.textContent = "O texto de até 100 caracter!";
        error.classList.remove("d-none")
        return;
    }
    fetch(`http://localhost:3000/user/task/update_task`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_task, task_text })
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(dados => {
            console.log(dados);
        })
    window.location.href = window.location.origin + "C:/Users/dudua/OneDrive/Documentos/Estudos2023/node/frontend/index.html"
})