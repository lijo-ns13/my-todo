
interface Task{
    id:number;
    task:string;
    isCompleted:boolean;
}

 class TodoManger{
    private tasks:Task[];
    constructor(initialTasks:Task[]=[]){
        this.tasks =initialTasks;
    }

    addTodo(task:string):void{
        const newTask:Task={
            id:Date.now(),
            task:task,
            isCompleted:false
        }
        this.tasks.push(newTask)
    }
    updateTodo(index:number,task:string):void{
        this.tasks=this.tasks.filter(task=>task.id!=index);
        const newTask:Task={
            id:index,
            task:task,
            isCompleted:false
        }
        this.tasks.push(newTask)
    }
    deleteTodo(index:number):void{
        this.tasks=this.tasks.filter(task=>task.id!=index);
    }
    toggleTodo(index:number):void{
        // this.tasks[index].isCompleted=!this.tasks[index].isCompleted;
        const find=this.tasks.findIndex((task)=>task.id==index);
        console.log('ifnd',find)
        if(find!=-1){
            this.tasks[find].isCompleted=!this.tasks[find].isCompleted;
        }
        
    }
    getTodos():Task[]{
        return this.tasks;
    }
}

export default TodoManger;