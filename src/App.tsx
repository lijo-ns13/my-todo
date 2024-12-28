
import taskManger from './utils/TodoManager'
import './App.css'
import { ChangeEvent,  FormEvent,  useRef,  useState } from 'react';

interface Task{
  id:number;
  task:string;
  isCompleted:boolean;
}

function App() {
  
  
  const manager=useRef(new taskManger());
  const [task,setTask]=useState<string>('')
  const [todoList,setTodoList]=useState<Task[]>([]);
  const [editTaskID,setEditTaskID]=useState<number|null>(null)
  const [editTask,setEditTask]=useState<string>('')

  
  const addTodo=(task:string)=>{
    manager.current.addTodo(task);
    setTodoList([...manager.current.getTodos()]);
    setTask('')
  }
  const DeleteTodo=(id:number)=>{
    manager.current.deleteTodo(id);
    setTodoList([...manager.current.getTodos()]);
  }
  const ToggleTodo=(id:number)=>{
    manager.current.toggleTodo(id);
    setTodoList([...manager.current.getTodos()]);
  }
  const UpdateTodo=(id:number,task:string)=>{
    manager.current.updateTodo(id,task);
    setTodoList(manager.current.getTodos());

  }

  function handleChange(e:ChangeEvent<HTMLInputElement>){
    
    setTask(e.target.value);
  }
  function handleSubmit(e:FormEvent){
    e.preventDefault();
    addTodo(task);
  }
  function handleUpdate(e: FormEvent) {
    e.preventDefault();
    if (editTaskID !== null) {
      UpdateTodo(editTaskID, editTask);
      setEditTaskID(null); // Close the update form after submission
      setEditTask(''); // Reset the editing task state
    }
  }
  return (
    <div className="app-container">
      <h1>My Todo Application</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={task}
          placeholder="Enter your task"
          onChange={handleChange}
          className="todo-input"
        />
        <button type="submit" className="add-todo-button">
          Add Todo
        </button>
      </form>

      <div className="todo-list-container">
        <div className="todo-section">
          <h2>My tasks not completed</h2>
          {todoList.length > 0 ? (
            <ul>
              {todoList.filter((todo) => !todo.isCompleted).map((todo) => (
                <li key={todo.id} className="todo-item">
                  <h3>{todo.task}</h3>
                  <div className="todo-actions">
                    <button onClick={() => DeleteTodo(todo.id)} className="delete-button">Delete</button>
                    <button onClick={() => ToggleTodo(todo.id)} className="complete-button">Mark as Complete</button>
                    <button onClick={() => { setEditTaskID(todo.id); setEditTask(todo.task); }}>Update</button>
                  </div>

                  {todo.id === editTaskID && (
                    <form onSubmit={handleUpdate}>
                      <input
                        type="text"
                        placeholder="Enter updated name"
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                      />
                      <button type="submit">Submit</button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks</p>
          )}
        </div>

        <div className="todo-section completed">
          <h2>My tasks completed</h2>
          {todoList.length > 0 ? (
            <ul>
              {todoList.filter((todo) => todo.isCompleted).map((todo) => (
                <li key={todo.id} className="todo-item completed-task">
                  <h3>{todo.task}</h3>
                  <div className="todo-actions">
                    <button onClick={() => DeleteTodo(todo.id)} className="delete-button">Delete</button>
                    <button onClick={() => ToggleTodo(todo.id)} className="undo-button">Undo</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No completed tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
