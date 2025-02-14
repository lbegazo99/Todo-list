import Project from "./todo_list.js";
import Todo_items from "./todos.js";
import "./styles.css";

const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

let create_task_block = document.createElement("dialog");
create_task_block.id = "create_task_block";

let create_project_block= document.createElement("dialog");
create_project_block.id = "create_project_block"


let project_div = document.createElement("div");
let list_of_projects = document.createElement("ul")
let todo_modal = document.createElement("dialog");
todo_modal.classList.add("todo_modal")


let home = new Project([],"home",0);
let projects = []
projects.push(home);
let curr_project_id = 0;

create_todo_modal();
create_todo_form();
create_project_form();
populate_sidebar();




function populate_sidebar(){
    create_userName_div();
    create_add_task_div();
    create_add_project_div();
    create_project_list_div();
}
function create_userName_div(){
    const userName_div = document.createElement("div");
    sidebar.appendChild(userName_div);
}

function create_add_task_div(){
    const addTask_div = document.createElement("div");
    addTask_div.classList.add("side-bar-div");
    const add_task = document.createElement("button");
    add_task.textContent = "Add task"
    add_task.addEventListener("click",function(){
        create_task_block.showModal()
    });
    addTask_div.appendChild(add_task);
    sidebar.appendChild(addTask_div);
    

}

function create_todo_form(){
    let title_div = document.createElement("div");
    title_div.id = "title_div";
    title_div.contentEditable = true;
    title_div.textContent = "enter a title";

    let description_div = document.createElement("div");
    description_div.id = "description_div";
    description_div.contentEditable = true;
    description_div.textContent = "Enter a todo";
    let description_div_caption = document.createElement("p");
    description_div_caption.textContent = "description";
    description_div.appendChild(description_div_caption);

    let date_div = document.createElement("div");
    date_div.contentEditable = true;
    date_div.textContent = "When would you like to do this"

    let priority_div = document.createElement("div");
    priority_div.contentEditable = true;
    priority_div.textContent = "Enter the priority level by entering red, orange, and blue"   


    let footer_div = document.createElement("div");
    let cancel_button = document.createElement("button");
    cancel_button.addEventListener("click",function (){
        create_task_block.close()
    })
    cancel_button.textContent = "Cancel"
    let add_task_button = document.createElement("button");
    add_task_button.addEventListener("click",function(){
        addTask(title_div.textContent,description_div.textContent,date_div.textContent,priority_div.textContent,curr_project_id);
    })
    add_task_button.textContent = "Add Task"
    footer_div.appendChild(cancel_button);
    footer_div.appendChild(add_task_button)

    create_task_block.appendChild(title_div);
    create_task_block.appendChild(description_div);
    create_task_block.appendChild(date_div);
    create_task_block.appendChild(priority_div);
    create_task_block.appendChild(footer_div);
    content.appendChild(create_task_block);
}

function addTask(title,description,date,priority,project_id){
    let this_project = projects[project_id];
    create_task_block.close()
    this_project.add_to_project(new Todo_items(title,description,date,priority))
    list_all_todos(project_id);
   
}

// list all of the projects 
function create_project_list_div(){
    project_div.classList.add("side-bar-div");
    project_div.textContent = "Projects";
    list_all_projects();
    project_div.appendChild(list_of_projects)
    sidebar.appendChild(project_div);
}


// list all of the todos when a project div gets clicked on
function list_all_todos(i){
    while (content.children.length > 2) {
        content.removeChild(content.children[2]); 
    }

   let this_project = projects[i];
  
    for( let j = 0; j<projects[i].size(); j++){
        let todo_block = document.createElement("div");
        todo_block.textContent = projects[i].get_todo(j).get_title()
        let open_todo_modal = document.createElement("button");
        open_todo_modal.textContent = "details";
        open_todo_modal.addEventListener("click",function() {
            todo_modal.showModal();
            fill_todo_modal(this_project,j);
        })
        todo_block.style.background = this_project.get_todo(j).priority;
        todo_block.appendChild(open_todo_modal);
        content.appendChild(todo_block);
    }
}

// creates the add project button
function create_add_project_div(){
    let add_project_button = document.createElement("button");
    add_project_button.id = "add_project_button"
    add_project_button.textContent = "add project"
    add_project_button.addEventListener("click",function(){
       create_project_block.showModal();
    })
    sidebar.appendChild(add_project_button);
}




// creates the project form and handles adding a new project to the list of projects
function create_project_form(){
    let project_name = document.createElement("div");
    project_name.id = "project_name";
    project_name.contentEditable = true;
    project_name.textContent = "enter a project name";
    

    let cancel_button = document.createElement("button")
    cancel_button.textContent = "cancel"
    cancel_button.addEventListener("click",function (){
        create_project_block.close()
    })
    let submit_button = document.createElement("button")
    submit_button.addEventListener("click",function () {
        create_project_block.style.display = "none"
        projects.push(new Project([],project_name.textContent,projects.length))
        list_all_projects();
    })
    submit_button.textContent = "submit"

    create_project_block.appendChild(project_name)
    create_project_block.appendChild(cancel_button)
    create_project_block.appendChild(submit_button)

    content.appendChild(create_project_block);
}

function list_all_projects(){
    while (list_of_projects.children.length > 0) {
        list_of_projects.removeChild(list_of_projects.children[0]); 
    }
    for(let i = 0; i<projects.length; i++){
        let project_name_div = document.createElement("div")
        project_name_div.textContent = projects[i].getName();
        project_name_div.addEventListener("click",function(){
          curr_project_id = i;
          list_all_todos(i);
        })
        list_of_projects.appendChild(project_name_div)
    }
}

function create_todo_modal(){
        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        let dueDate_div = document.createElement("div");
        dueDate_div.className = "dueDate"
        let priority_div = document.createElement("div");
        priority_div.className = "priorityDiv"
        todo_modal.appendChild(h1);
        todo_modal.appendChild(p);
        todo_modal.appendChild(dueDate_div);
        todo_modal.appendChild(priority_div);
        let exit_button = document.createElement("button");
        exit_button.textContent = "close"
        exit_button.addEventListener("click", function(){
            todo_modal.close()
        })
        content.appendChild(todo_modal)
}
function fill_todo_modal(this_project,j){
    document.querySelector(".todo_modal > h1").textContent = this_project.get_todo(j).get_title()
    document.querySelector(".todo_modal > p").textContent = this_project.get_todo(j).description;
    document.querySelector(".todo_modal > .dueDate").textContent = this_project.get_todo(j).dueDate;

}