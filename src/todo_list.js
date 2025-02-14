
 class Project{
    todo_list = [];
    project_name = " ";
    project_id = 0;

    constructor(todo_list,project_name,project_id){
        this.todo_list = todo_list;
        this.project_name = project_name;
        this.project_id = project_id;
    }

    add_to_project(todo) {
        this.todo_list.push(todo);
    }

    size(){
        return this.todo_list.length;
    }

    get_todo(i){
        return this.todo_list[i];
    }

    getName(){
        return this.project_name;
    }

}

export default Project;