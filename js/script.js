const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTaskBtn.addEventListener("click", addTask);

taskList.addEventListener("click", function(e){

if(e.target.classList.contains("deleteBtn")){
const index = e.target.parentElement.parentElement.dataset.index;
tasks.splice(index,1);
saveTasks();
renderTasks();
}

if(e.target.classList.contains("completeBtn")){
const index = e.target.parentElement.parentElement.dataset.index;
tasks[index].completed = !tasks[index].completed;
saveTasks();
renderTasks();
}

});

filterButtons.forEach(button=>{
button.addEventListener("click",function(){
const filter = this.dataset.filter;
renderTasks(filter);
});
});

function addTask(){

const text = taskInput.value.trim();

if(text === ""){
alert("Please enter a task");
return;
}

tasks.push({
text:text,
completed:false
});

taskInput.value="";

saveTasks();
renderTasks();

}

function renderTasks(filter="all"){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

if(filter==="completed" && !task.completed) return;
if(filter==="pending" && task.completed) return;

const li = document.createElement("li");
li.className="list-group-item";
li.dataset.index=index;

if(task.completed){
li.classList.add("completed");
}

li.innerHTML=`
<span>${task.text}</span>

<div>
<button class="btn btn-success btn-sm completeBtn">✓</button>
<button class="btn btn-danger btn-sm deleteBtn">✕</button>
</div>
`;

taskList.appendChild(li);

});

}

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}