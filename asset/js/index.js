let id_user = 1

let colors = [{
        task_status: 'new',
        select_bg_color: '' //'bg-white'
    },
    {
        task_status: 'in progress',
        select_bg_color: 'bg-info'
    },
    {
        task_status: 'canceled',
        select_bg_color: 'bg-danger'
    },
    {
        task_status: 'done',
        select_bg_color: 'bg-success'
    }
];

window.onload = () => {
    get_username(id_user)
    get_user_task(id_user)
}

function get_username(id_user) {
    fetch(`http://localhost:3000/user/${id_user}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log('nok');
            }
        })
        .then(dados => {
            if (dados.length === 0) {
                console.log('nok');
            } else {
                document.querySelector("#username").textContent = dados[0].username;
            }
        })
}

function get_user_task(id_user, status = "all") {
    fetch(`http://localhost:3000/user/${id_user}/tasks/${status}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log('nok');
            }
        })
        .then(tarefas => {
            if (tarefas.length === 0) {
                document.querySelector("#no_tasks").classList.remove("d-none");
                document.querySelector("#total_tasks").classList.add("d-none");
            } else {
                document.querySelector("#task_container").innerHTML = null;
                document.querySelector("#total_tasks").classList.remove("d-none");
                document.querySelector("#no_tasks").classList.add("d-none");



                tarefas.forEach(tarefa => {

                    let color = colors.find(item => item.task_status == tarefa.task_status)

                    let htmltask = `<div class="row mb-3">
                    <div class="col-12 border border-secondary rounded p-3 shadow">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <div class="d-flex align-items-center">
                                    <h5><i class="fa-solid fa-circle-chevron-right me-2"></i></h5>
                                    <h5>${tarefa.task_text}</div>
                            </div>
                            <div class="col-2">
                                <select id="task_status_${tarefa.id}" onchange="change_task_status(${tarefa.id})" class="${color.select_bg_color} p-2">
                                    <option value="new" ${tarefa.task_status == 'new' ? 'selected' : ''}>new</option>
                                    <option value="in progress" ${tarefa.task_status == 'in progress' ? 'selected' : ''}>in progress</option>
                                    <option value="canceled" ${tarefa.task_status == 'canceled' ? 'selected' : ''}>canceled</option>
                                    <option value="done" ${tarefa.task_status == 'done' ? 'selected' : ''}>done</option>
                                </select>
                            </div>
                            <div class="col-1 text-end"><span class="edit_link" onclick="edit_task(${tarefa.id})"><i class="fa-solid fa-pen-to-square me-2"></i>Edit</span></div>
                            <div class="col-1 text-end text-danger"><span class="delete_link" onclick="delete_task(${tarefa.id})"> <i class="fa-regular fa-trash-can me-2"></i>Delete</span></div>
                        </div>
                    </div>
                </div>`;

                    let new_task = document.createElement('div');
                    new_task.classList.add('row', 'mb-3');
                    new_task.innerHTML = htmltask

                    document.querySelector("#task_container").appendChild(new_task);
                    document.querySelector("#total_tasks > div > h4 > span").textContent = tarefas.length;

                });

            }
        })
}

function edit_task(id_task) {
    const url = window.location.origin + "C:/Users/dudua/OneDrive/Documentos/Estudos2023/node/frontend/edit_task.html?id_task=" + id_task;
    window.location.href = url;
}

function delete_task(id_task) {
    const url = window.location.origin + "C:/Users/dudua/OneDrive/Documentos/Estudos2023/node/frontend/delete_task.html?id_task=" + id_task;
    window.location.href = url;
}

function change_task_status(id_task) {

    let status = document.querySelector("#task_status_" + id_task).value;
    fetch(`http://localhost:3000/user/${id_user}/task/uptade_status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_task, status })
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(dados => {
            console.log(dados);
        })

    let color = colors.find(item => item.task_status == status);
    let color_tmp = colors.map(c => { if (c.select_bg_color != '') return c.select_bg_color });


    document.querySelector("#task_status_" + id_task).classList.remove(...color_tmp);
    document.querySelector("#task_status_" + id_task).classList.add(color.select_bg_color);

}

document.querySelector("#btn_new_task").addEventListener('click', () => {
    const url = window.location.origin + "C:/Users/dudua/OneDrive/Documentos/Estudos2023/node/frontend/new_task.html?id_user=" + id_user;
    window.location.href = url;
})

document.querySelector("#select-filter").addEventListener('click', () => {
    task_status = document.querySelector("#select-filter").value;
    get_user_task(id_user, task_status)
})