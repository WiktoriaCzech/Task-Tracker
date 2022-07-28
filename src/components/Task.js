import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ?
            'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FontAwesomeIcon icon={faTimes}
                                             style={{color: '#492f29', cursor: 'pointer'}}
                                             onClick={() => onDelete(task.id)}
            /></h3>
            <p>{task.day}</p>
            <p><Link className='details' to={`/tasks/${task.id}`}>View Details</Link></p>
        </div>
    )
}
export default Task