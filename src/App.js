import {useState} from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
    const [showAddTask,setShowAddTask] = useState(false)
   //list of tasks
  const [tasks, setTasks] = useState([
        {
            id:1,
            text: 'Doc Appointment',
            day: '5th Feb 2022 at 2:30pm ',
            reminder: true,
        },
        {
            id:2,
            text: 'Meeting with friends',
            day: 'Tommorrow at 5 pm',
            reminder: true,
        },
        {
            id:3,
            text: 'Buy groceries',
            day: 'Today',
            reminder: false,
        },
    ])
  //Add Task
    const addTask = (task) => {
      const id = Math.floor(Math.random() * 10000)+1
      const newTask = {id, ...task}
        setTasks([...tasks,newTask])
    }
  //Delete Task
  const deleteTask = (id) => {
      setTasks(tasks.filter( (task) => task.id !== id))
  }
  //toggle reminder
    const toggleReminder = (id) => {
      setTasks(tasks.map((task) => task.id === id
      ? {...task, reminder: !task.reminder } : task))
    }
  return (
    <div className="container">
      <Header  onAdd = {() => setShowAddTask(!showAddTask)}
      showAdd = {showAddTask}
      />
        <h6>to set the reminder double click on the task</h6>
        {/*//short form of if ? : without else*/}
        {showAddTask && <AddTask onAdd = {addTask} />}
      {tasks.length > 0 ?
          (<Tasks tasks = {tasks} onDelete = { deleteTask }
            onToggle = {toggleReminder}/>)
          : ('There are no tasks left, good job!')
      }
    </div>
  );
}

export default App;
