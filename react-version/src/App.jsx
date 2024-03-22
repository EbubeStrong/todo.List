import { useState } from 'react';
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([])
  const [err, setErr] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (input == "") {
      displayError()
    } else {
      createToDo()
    }
  }

  const displayError = () => {
    setErr(true);
  }
  // Creates to do 
  const createToDo = () => {
    setTasks(prev => ([...prev, {
      id: parseInt(Math.floor(Math.random() * 1000)),
      input
    }]))
    setInput("");
  }
  // Edits to do 
  const editToDo = (id) => {
    const newValue = prompt("Enter new task content:")
    setTasks(prev => prev.map(item => item.id == id ? { id, input: newValue } : item));
  }

  // Delete to do
  const deleteToDo = (id) => {
    setTasks(prev => prev.filter(item => item.id != id));
  }
  return (
    <>
      <h1>Todo List</h1>
      <form className="todoContainer" onSubmit={submit}>
        <input type="text" className="todoInput" placeholder="Type Your Todo List" onChange={(e) => setInput(e.target.value)} value={input} />
        <button type="submit">Add Task</button>
      </form>

      <div className="card-mainContainer">
        <div class="card-container">
          {
            tasks.map((task, index) => (
              <div className="container" key={index}>
                <div className="text">
                  <p className="todo-value">{task.input}</p>
                </div>
                <div className="btn">
                  <button className="edit-btn" onClick={() => editToDo(task.id)}>edit</button>
                  <button className="delete-btn" onClick={() => deleteToDo(task.id)}>delete</button>
                </div>
              </div>
            ))
          }

        </div>
        {err && <div><p class="errorDisplay">Please, Enter a Todo-List</p><div class="errorBtn"><button class="errorDelete-btn delete-btn:hover" onClick={() => setErr(false)} >delete</button></div></div>}
      </div>

    </>
  )
}

export default App
