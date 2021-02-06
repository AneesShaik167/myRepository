import Task from './Task'
const Tasks = ({tasks, onDelete, toggleReminder}) => {
    
    return (
        <>
        {tasks.map((task)=>(
        <Task key={task.id} onDelete={onDelete} toggleReminder={toggleReminder}
         task={task}/>
        ))}
        </>
    )
}

export default Tasks
