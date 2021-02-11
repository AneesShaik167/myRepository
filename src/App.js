import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import React from "react"
import Tasks from "./components/Tasks"
import {useState, useEffect} from 'react'
import AddTask from "./components/AddTask";
import Task from "./components/Task";
import { BrowserRouter as Router,Route } from "react-router-dom";

function App() {
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    const getTasks= async ()=>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

//Fetch Tasks
const fetchTasks = async ()=>{
  const result = await fetch("http://my-json-server.typicode.com/AneesShaik167/myRepository/tasks");
  const data = await result.json();
  return data;
}

//Fetch Task
const fetchTask = async (id)=>{
  const result = await fetch(`http://my-json-server.typicode.com/AneesShaik167/myRepository/tasks/${id}`);
  const data = await result.json();
  return data;
}

//Add Task
const addTask = async (task)=>{
    const result = await fetch('http://my-json-server.typicode.com/AneesShaik167/myRepository/tasks',{
    method:'POST',
    headers:{
      'content-type' : 'application/json',
    },
    body: JSON.stringify(task),
  })
  const data = await result.json();
  setTasks([...tasks,data]);
  // const id = Math.floor((Math.random() * 1000)) + 1;
  // const newTask = {id, ...task};
  // console.log(newTask);
  // setTasks([...tasks, newTask]);
}
//ToggleReminder
const toggleReminder = async(id)=>{
  const result = await fetchTask(id);
  const taskToUpdate = {...result,reminder:!result.reminder};
  const res = await fetch(`http://my-json-server.typicode.com/AneesShaik167/myRepository/tasks/${id}`,{
    method:'PUT',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(taskToUpdate)
  })
  const data = await res.json();


setTasks(tasks.map((task)=>
task.id === id ? {...task, reminder:
  data.reminder } : task
  )
 )
}
//Delete Task
const deleteTask = async (id)=>{
  await fetch(`http://my-json-server.typicode.com/AneesShaik167/myRepository/tasks/${id}`,{
    method:'DELETE',
  })
setTasks(tasks.filter((task) => task.id !== id))
}
  return (
    //JSX
    <Router>
    <div className='container'>
      <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      
       <Route path='/' exact render={(props)=>(
         <>
         {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ?<Tasks tasks={tasks} onDelete={deleteTask}
       toggleReminder={toggleReminder} /> : 'No Tasks To Show'}
         </>
       )}>
       </Route>
       <Route path='/about' component={About} ></Route>
       <Footer/>
    </div>
    </Router>
  );
}

export default App;
