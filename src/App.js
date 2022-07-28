import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";

//RUN THE APP AND JSON SERVER!!! -> npm start and npm run server
function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    //updating the arr usestate empty for some connection with db json
    const [tasks, setTasks] = useState([])
    //display tasks form BE
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])
    //fetch tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        // console.log(data)
        return data
    }
    //get separate task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }
    //Add Task with DB
    const addTask = async (task) => {
        const res = await fetch(`http://localhost:5000/tasks`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
        //save returned data
        const data = await res.json()
        //set new data on the existing list
        setTasks([...tasks, data])
        //BE assigns the id for us so no need for id generator
        // const id = Math.floor(Math.random() * 10000)+1
        // const newTask = {id, ...task}
        //   setTasks([...tasks,newTask])
    }
    //Delete Task by id from DB
    const deleteTask = async (id) => {
        await fetch(` http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })
        setTasks(tasks.filter((task) => task.id !== id))
    }
    //toggle reminder with BE
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = {
            ...taskToToggle,
            reminder: !taskToToggle.reminder
        }
        const res = await fetch(` http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })
        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id
            ? {...task, reminder: data.reminder} : task))
    }
    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)}
                        showAdd={showAddTask}/>
                <Routes>
                    <Route path='/' element={
                        <>
                            <h5>to set the reminder double click on the task</h5>
                            {/*//short form of if ? : without else*/}
                            {showAddTask && <AddTask onAdd={addTask}/>}
                            {tasks.length > 0 ?
                                (<Tasks tasks={tasks} onDelete={deleteTask}
                                        onToggle={toggleReminder}/>)
                                : ('There are no tasks left, good job!')
                            }
                        </>
                    }/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/tasks/:id' element={<TaskDetails/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    )
}

export default App;
