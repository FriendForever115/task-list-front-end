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

            document.querySelector("#task_text").textContent = task[0].task_text;
            document.querySelector("#task_status").textContent = task[0].task_status;

        })
}

document.querySelector("#btn_eliminar").addEventListener('click', () => {

    fetch(`http://localhost:3000/user/task/delete_task/${id_task}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
    window.location.href = window.location.origin + "C:/Users/dudua/OneDrive/Documentos/Estudos2023/node/frontend/index.html"
})