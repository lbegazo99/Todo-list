class Todo_items{
    title = ""
    description = ""
    dueDate = ""
    priority = ""


    constructor(title,description,dueDate,priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority
    }

    get_title(){
        return this.title;
    }

}

export default Todo_items

