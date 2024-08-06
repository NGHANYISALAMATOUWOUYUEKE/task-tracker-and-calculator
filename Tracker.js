// declaring
let date = document.querySelector('#date');
let detail = document.querySelector('#detail');
let button = document.querySelector('#button');
let List = document.querySelector('.displaylist');

// Eventlistener
button.addEventListener("click", addtask);


// fuctions
function addtask(event) {

    event.preventDefault();

    if (date.value && detail.value) {
        const displayList = document.createElement('div');
        displayList.classList.add('todo');

        saveTask(date.value, detail.value);
        

        const view = document.createElement('ul');
        view.classList.add('view');
        view.innerHTML = `
        <div class="textlist">
            <li class="text" onclick="checkEffect(this)">
                <small>${date.value}</small>
                <small>${detail.value}</small>
            </li>
            <li>
                <button class = "edit" data-bs-toggle="modal" onclick="Edit(this)">edit</button>
                <button class = "delete" onclick="deleteBtn(this)">delete</button>
            </li>
        </div>
        `;
        date.value = '';
        detail.value = '';

        displayList.appendChild(view)
        List.appendChild(displayList)

        // store in local storage
    }
    else {
        alert('please fill the space');
    }

}

function saveTask(date, detail) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const taskObj = { date: date, detail: detail }
    savedTasks.push(taskObj)

    localStorage.setItem('tasks', JSON.stringify(savedTasks));

}

function deleteBtn(e){
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let selectedTask = e.parentElement.parentElement;
    const text = selectedTask.children[0].children[2].innerHTML;

    const newTasks = savedTasks.filter((task)=>(task.detail != text))

    let elementToRemove = document.querySelector(".view");
    elementToRemove.remove();
    
    localStorage.setItem('tasks', JSON.stringify(newTasks));
}

function Edit(e){
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let selectedTask = e.parentElement.parentElement;
    const text = selectedTask.children[0].children[2].innerHTML;
    date.value = selectedTask.children[0].children[1].innerHTML;
    detail.value = selectedTask.children[0].children[2].innerHTML;
    const newTasks = savedTasks.filter((task)=>(task.detail != text))

    localStorage.setItem('tasks', JSON.stringify(newTasks));

    let elementToRemove = document.querySelector(".view");
    elementToRemove.remove();
}

let complete = false;
function checkEffect(e){

    // to remove the ticks 
    if (complete === false){
        let selectedTask = e.parentElement.parentElement;
        let tick = document.createElement('i');
        tick.className = 'fa fa-check';
        tick.style.display = "flex";
        tick.style.color = "rgb(228, 115, 115)"
        const text1 = selectedTask.children[0];
        text1.style.textDecoration = "line-through";
        let span = document.createElement('span');
        span.className = 'span';
        span.appendChild(tick);
        span.appendChild(text1);
        selectedTask.appendChild(span);
        complete = !complete;
    }
    else{
        let toRemoveSpan = document.querySelector(".span");
        toRemoveSpan.removeChild(span);
        let selectedTask = e.parentElement.parentElement;
        let tick = document.createElement('i');
        tick.className = 'fa fa-check';
        tick.style.display = "none";
        tick.style.color = "rgb(228, 115, 115)"
        const text1 = selectedTask.children[0];
        text1.style.textDecoration = "none";
        let span1 = document.createElement('span');
        span.className = 'span1';
        span.appendChild(text1);
        selectedTask.appendChild(span);
        complete = !complete;
    }


}