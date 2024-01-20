let id_user = null

window.onload = () => {
    const url = new URL(window.location.href);
    id_user = url.searchParams.get('id_user');
}

document.querySelector("#btn_guardar").addEventListener('click', () => {

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

    fetch(`http://localhost:3000/user/${id_user}/task/new_task`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_user, task_text })
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