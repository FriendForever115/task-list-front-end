# LISTA DE TAREFAS

Uma aplicação frontend com HTML, CSS e JS puro para gerir tarefas.
No Backend vamos ter uma API Node.js+Express+MySQL para servir o frontend.

# BASE DA DADOS     

    users
        id
        username
        password
        created_at
        updated_at

    tasks
        id
        id_user
        task_text
        task_status(new | in progress | canceled | done)
        created_at
        updated_at

# TAREFAS A DESENVILVER NO PROJETO

    > criar a estrutura inicial
    FEITO - base do frontend (html css js | bootstrap)
        - base do backend (node + express + mysql) com resposta padrão

    > no frontend
        FEITO - pagina necessarias para a navegação no nosso app
        - pequenos testes de comunicação entre p frontend e backend - utilizando Ajax(XMLhttprequest | fetch API)

    - ver tarefas
        titulo
        FEITO filtro para escolher tarefa que queremos ver (select)
        FEITO botão para adicionar tarefas
        (mensagem sobre o facto de não existirem tarefas)
        caixa para tarefas
            - possibilidade de alterar o status, editar tarefa e eliminar tarefa
            paragrafo com o total de tarefas disponiveis (de acordo com o filtro)

    - adicionar tarefa
        FEITO input:text para editar o texto da tarefa
        FEITO botão para cancelar
        FEITO botão para submeter tarefa

    - editar tarefa 
        input: text para editar o texto da tarefa
        botão para cancelar 
        botão para submeter alteração

    (eliminar será feito com uma modal)

    > no backend
        - criar um servidor NodeJS + Express + MySQL
        - criar um endpoint inicial - testa comunicação
        

