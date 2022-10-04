let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formValidation();
});

let formValidation = ()=>{
    if (textInput.value === "") {
        console.log('failure');
        msg.innerHTML = "Task cannot be blank";
    }
    else{
        console.log('success');
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        // creating IIFE (immediately invoked function Expression)
        (()=>{
            add.setAttribute("data-bs-dismiss", ""); 
        })()
    }
};

// accept and store data

let data = [];


// storing data
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();
};

//Default, i want the data to be stored, so i don't need these
// let acceptData = () => {
//     data["text"] = textInput.value;
//     data["date"] = dateInput.value;
//     data["description"] = textarea.value;

//     createTasks();
// };


let createTasks = ()=>{
    // insering a map (using IIFE FUNCTION)
    tasks.innerHTML = "";
    // x target individual object one by one
  data.map((x,y)=>{
    return (tasks.innerHTML += `
    <div id=${y}>
    <span class="fw-bold">${x.text}</span>
    <p class="small text-secondary">${x.date}</p>
    <p>${x.description}</p>
  
    <span class="options">
       <i onClick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form"><i class="fa-solid fa-pen-to-square"></i></i> 
       <i onClick = "deleteTask(this);createTasks()"><i class="fa-solid fa-trash"></i></i>
    </span>
  </div>
  `);
  });
  

resetForm();
};

// deleting Task
let deleteTask = (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

// edit task
let editTask = (e)=>{
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    // once the task is edited, delete the previous and edit.
    deleteTask(e);
};


// reseting
let resetForm = ()=>{
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

// retreiving data from the localstorage to the application
// using IIFE FUNCTION

(()=> {
   data = JSON.parse(localStorage.getItem("data")) || [];
   console.log(data);
   createTasks();
})();
// end of js
