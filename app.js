document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(e) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
 if(title!="" && description!=""){
  const task = {
    title,
    description,
  };
  if (localStorage.getItem("tasks") === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
 getTask();
 document.getElementById('formTasks').reset();
  e.preventDefault(); //cancela el refresh del formulario
 }else{
      swal( '','No puedes guardar tareas vacias', 'error')
      e.preventDefault(); //cancela el refresh del formulario
 }
  
}
function getTask() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let tasksView = document.getElementById("task");
  tasksView.innerHTML = ''; 
  for (let i = 0; i< tasks.length; i++){
        let title=tasks[i].title;
        let description=tasks[i].description;
        tasksView.innerHTML +=`<div class="card mb-2">
        <div class="card-body d-flex justify-content-between align-items-center">
        <p><strong>${title} </strong>- ${description} </p>
        <a class="btn btn-outline-danger" onclick="deleteTask('${title}')">Delete</a>
        </div>
        </div>`;
  } 

}
function deleteTask(title){
    let tasks=JSON.parse(localStorage.getItem('tasks'));
    for (let i=0; i<tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i,1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTask();
}
getTask();
