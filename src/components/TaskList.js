import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Task from "./Task"
import TaskForm from "./TaskForm"
import axios from "axios"
import { url } from "../App"
import loader from "../assets/loader.gif"

const TaskList = () => {
//////////////////////////////////////////////////////////////////////
    const [isEdited, setIsEdited] = useState(false)
    const [getID, setGetID] = useState("")
    const [tasks, setTasks] = useState([])
    const [completedTask, setCompletedTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        completion: false
    })
    const {name} = formData
////////////////////////////////////////////////////////////////////////////
    const handelInputChange = (e)=>{
        const {name, value} = e.target
        setFormData({
            ...formData, [name]: value
        })
        }
/////////////////////////////////////////////////////////////////////////////
    const getTask = async ()=>{
            setIsLoading(true)
            try{
                const {data} = await axios.get(`${url}/api/tasks/`)
            setIsLoading(false)
            setTasks(data)
            }catch(error){
                toast.error(error.message)
                console.log(1);
            }
               
                }
    useEffect(()=>{getTask()}, [])
/////////////////////////////////////////////////////////////////////////////
    const createTask = async (e)=>{
        e.preventDefault()
        if(name===""){
            return toast.error("Input field cannot be empty")
        }
        try{
            
            await axios.post(`${url}/api/tasks/`, formData)
            toast.success("Task added sucessfully")
            setFormData({...formData, name:""})
            getTask()


        } catch(error){
                toast.error(error.message)
        }
    }
//////////////////////////////////////////////////////////////////////////////////////
const deleteTask = async (id)=>{
    try{
        await axios.delete(`${url}/api/tasks/${id}`)
        getTask()

    } catch(error){
        toast.error(error.message)
    }
}
//////////////////////////////////////////////////////////////////////////////////////
const getEditTask = async (task)=>{
    setFormData({
        name: task.name,
        completion: false
    })
    setGetID(task._id)
    setIsEdited(true)
}
///////////////////////////////////////////////////////////////////////////////////////
const updateTask = async(e)=>{
    e.preventDefault()
    if(name===""){
        return toast.error("Input field cannot be empty")
    }
    try{
        
        await axios.put(`${url}/api/tasks/${getID}`, formData)
        toast.success("Task has been updated")
        setFormData({...formData, name:""})
        setIsEdited(false)
        getTask()
    } catch(error){
            toast.error(error.message)
    }    
} 

////////////////////////////////////////////////////////////////////////////
const taskToCompleted = async (task)=>{
      const newFormData = {
        name: task.name,
        completion: true
      }
      try{
        
        await axios.put(`${url}/api/tasks/${task._id}`, newFormData)
        toast.success("Task completed sucessfully")  
             
        getTask()
    } catch(error){
            toast.error(error.message)
    }   
}
//////////////////////////////////////////////////////////////////////
useEffect(()=>{
    const total =  tasks.filter((task)=> {
             return task.completion===true
     })
     setCompletedTasks(total)
},[tasks])


  return (
    <div>
        <h2>Task Manager</h2>
        <TaskForm 
        name={name} 
        createTask={createTask} 
        handelInputChange={handelInputChange} 
        getEditTask={getEditTask}
        isEdited={isEdited}
        updateTask={updateTask}
        taskToCompleted={taskToCompleted} />
        {tasks.length>0 &&
        <div className="--flex-between --pd">
            
                 <p>
                <b>Total Task:</b> {tasks.length}
            </p>
            <p>
                <b>Completed Task:</b> {completedTask.length}
            </p>
            
            
            
        </div>}
        <hr/>
        {
            isLoading && (<div className="--flex-center">
                <img src={loader} alt="Loading..."/>
                </div>)
        }
        {
            !isLoading && tasks.length===0?  (<p className="--py">Please add a task</p>) : <>
            {
                tasks.map((task, index) => {
                    return <Task 
                    key={task._id} 
                    task={task} 
                    index={index} 
                    deleteTask={deleteTask}
                    getEditTask={getEditTask}
                   
                    taskToCompleted={taskToCompleted}/>
                })
            }
            </>
        }
       
    </div>
  )
}

export default TaskList