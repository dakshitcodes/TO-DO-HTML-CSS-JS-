document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => renderTask(task));

    addTaskButton.addEventListener('click', () => {

        const taskText = todoInput.value.trim(); // trim() is used to trim extra space

        if(taskText === "") return; // empty string, nothing passed

        const newTask = { // to identify each task with new identity based on date beacuse date never repeats
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);
        saveTasks(); // any tasks that are added will go into local storage
        renderTask(newTask)
        // if somebody has completed, delete it also
        todoInput.value = ""; // clear input

        console.log(tasks);
        
    })

    function renderTask(task) {
        
        // console.log(task.text);
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        if(task.completed) li.classList.add('completed')
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;
        li.addEventListener('click', (e) => {
            if(e.target.tagName == "BUTTON") return;
            task.completed = !task.completed;
            li.classList.toggle('completed')
            saveTasks()
        });
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); // prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTasks()
        })
        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks)) // stringify to convert data which is not string to string
    }

})
