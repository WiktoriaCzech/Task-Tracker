import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function TaskDetails() {
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`http://localhost:5000/tasks/${params.id}`)
            const data = await res.json()
            if (res.status === 404) {
                navigate('/')
            }

            setTask(data)
            setLoading(false)
        }
        fetchTask()
    }, [])
    return loading ? (
        <h3>Loading...</h3>
    ) : (
        <div className='task-details'>
            <div className='single-task'>
                <h3>What: {task.text}</h3>
                <p>Where: {task.day}</p>
                <p>Reminder is: {task.reminder ? 'On' : 'Off'} </p>
            </div>
            <div className='return-button'>
                <FontAwesomeIcon icon={faArrowLeft}
                                 style={{color: '#492f29', cursor: 'pointer'}}
                                 onClick={() => {
                                     navigate(-1)
                                 }}
                />
            </div>
        </div>
    )
}

export default TaskDetails