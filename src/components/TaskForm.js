const TaskForm = ({createTask, name, handelInputChange, isEdited, updateTask, }) => {
  return (
    <div>
        <form className="task-form" onSubmit={isEdited ? updateTask : createTask}>
            <input 
                type="text" 
                placeholder="Add a task" 
                name="name" 
                value={name}
                onChange={handelInputChange}/>
            <button type="submit" >{isEdited ? "Edit" : "Add"}</button>

        </form>
    </div>
  )
}

export default TaskForm