import {FaCheckDouble, FaEdit, FaRegTrashAlt} from "react-icons/fa"
const Task = ({task, index, deleteTask, getEditTask, taskToCompleted}) => {
  return (
    <div className={task.completion ? "task completed" :"task"}>
        <p>
            <b>{index + 1}.</b> {task.name}
        </p>
        <div className="task-icons">
            <FaCheckDouble color="green" onClick={()=>taskToCompleted(task)}/>
            <FaEdit color="purple" onClick={()=>{getEditTask(task)}}/>
            <FaRegTrashAlt color="red" onClick={()=> deleteTask(task._id)}/>
        </div>
    </div>
  )
}

export default Task