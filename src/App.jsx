import { useState } from 'react'
import './App.css'
import './kenban.css'
import TaskCard from './components/TaskCard/TaskCard'
import AddOrSearchWidget from './components/AddOrSearchWidget/AddOrSearchWidget'
import TaskList from './components/TaskList/TaskList'
import { getCurrentDateTime } from './utils/utils'
import { v4  } from 'uuid'

const App = () => {
  // initialize state allTasks with the value from localStorage, or an empty array if there is no value
  const allLocalTasks = localStorage.getItem('allTasks')
  const initialTasks = allLocalTasks ? JSON.parse(allLocalTasks) : []
  const [allTasks, setAllTasks] = useState(initialTasks)

  const getLocalTaskStorage = () => {
    return JSON.parse(localStorage.getItem('allTasks'))
  }

  const setLocalTaskStorage = tasks => {
    localStorage.setItem('allTasks', JSON.stringify(tasks))
  }

  const handleTaskAdd = (deadline, title, content) => {
    // use v4 from uuid to generate a unique id for each task
    const newTask = { id: v4(), deadline, title, content, done: false }
    setAllTasks([...allTasks, newTask])
    // use localStorage to store the allTasks (after JSON.stringify)
    setLocalTaskStorage([...allTasks, newTask])
  }

  const handleDoneToggle = (id, done) => {
    const tasks = getLocalTaskStorage()
    const updatedTasks = tasks.map(task=>task.id===id? {...task,done}:task)
    // update localStorage with the updated allTasks
    setLocalTaskStorage(updatedTasks)

    const updatedResults = allTasks.map(task=>task.id===id? {...task,done}:task)
    setAllTasks(updatedResults)
  }

  const handleDeadlineChange = (id, deadline) => {
    const tasks = getLocalTaskStorage()
    const updatedTasks = tasks.map(task=>task.id===id? {...task, deadline}:task)
    setLocalTaskStorage(updatedTasks)

    const updatedResults = allTasks.map(task => task.id === id ? { ...task, deadline } : task)
    setAllTasks(updatedResults)
  }

  const handleTitleChange = (id, title) => {
    const tasks = getLocalTaskStorage()
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, title } : task)

    setLocalTaskStorage(updatedTasks)

    const updatedResults = allTasks.map(task => task.id === id ? { ...task, title } : task)

    setAllTasks(updatedResults)
  }

  const handleContentChange = (id, content) => {
    const tasks = getLocalTaskStorage()
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, content } : task)

    setLocalTaskStorage(updatedTasks)

    const updatedResults = allTasks.map(task => task.id === id ? { ...task, content } : task)

    setAllTasks(updatedResults)
  }

  const handleTaskDelete = id =>{
    const tasks = getLocalTaskStorage()
    const updatedTasks = tasks.filter(task => task.id !== id)
    setLocalTaskStorage(updatedTasks)

    const updatedResults = allTasks.filter(task => task.id !== id)
    setAllTasks(updatedResults)
  }

  const handleTaskSearch = (deadlineFrom, deadlineTo, titleInput, contentInput) => {
    const tasks = getLocalTaskStorage()
    // return all tasks if no search criteria is provided
    if ([deadlineFrom, deadlineTo, titleInput, contentInput].every(arg => !arg)) return setAllTasks(tasks)
    const filteredTasks = tasks.filter(task => (
      !task.deadline || (task.deadline >= deadlineFrom && (!deadlineTo || task.deadline <= deadlineTo))
    ) &&
      task.title.includes(titleInput) && task.content.includes(contentInput)
    )
    setAllTasks(filteredTasks)
  }

  const getTaskStatus = (task) => {
    if (task.done) return 'completed'
    if (!task.deadline) return 'unscheduled'
    if (task.deadline < getCurrentDateTime()) return 'overdue'
    return 'scheduled'
  }

  // sort tasks by deadline, sortOrder 1 for ascending by default and -1 for descending
  const sortTasksByDeadline = (task1, task2, sortOrder = 1) => {
    if (task1.deadline < task2.deadline) return -1 * sortOrder
    if (task1.deadline > task2.deadline) return 1 * sortOrder
  }

  const overdueTasks = allTasks.filter(task => !task.done && task.deadline && task.deadline < getCurrentDateTime()).toSorted((task1, task2) => sortTasksByDeadline(task1, task2))

  const scheduledTasks = allTasks.filter(task => !task.done && task.deadline && task.deadline >= getCurrentDateTime()).toSorted((task1, task2) => sortTasksByDeadline(task1, task2))

  const unscheduledTasks = allTasks.filter(task => !task.done && !task.deadline).toSorted((task1, task2) => task1.title < task2.title ? -1 : 1)

  const completedTasks = allTasks.filter(task => task.done).toSorted((task1, task2) => sortTasksByDeadline(task1, task2, -1))

  const taskListsByStatus = {
    overdue: { tasks: overdueTasks, color: '#EC407A' },
    scheduled: { tasks: scheduledTasks, color: '#4F46E5' },
    unscheduled: { tasks: unscheduledTasks, color: '#F59E0B' },
    completed: { tasks: completedTasks, color: '#94A3B8' }
  }
  
  // create TaskCard components for tasks
  const createTaskCards = tasks => tasks.map(task =>
    <TaskCard
      key={task.id}
      status={getTaskStatus(task)}
      color={taskListsByStatus[getTaskStatus(task)]['color']}
      deadline={task.deadline}
      title={task.title}
      content={task.content}
      done={task.done}
      onDoneToggle={done => handleDoneToggle(task.id, done)}
      onDeadlineChange={deadline => handleDeadlineChange(task.id, deadline)}
      onTitleChange={title => handleTitleChange(task.id, title)}
      onContentChange={content => handleContentChange(task.id, content)}
      onTaskDelete={() => handleTaskDelete(task.id)}
    />
  )

  const taskLists = Object.keys(taskListsByStatus).map(status => {
    
    const { tasks, color } = taskListsByStatus[status]

    return (
      <TaskList
        key={status}
        listClasses={`task-list task-list-${status}`}
        barTitle={status}
        taskCount={tasks.length}
        color={color}
      >
        {tasks.length === 0 ?
          <div className='no-task-alt' style={{ color }}>
            {`--- No ${status} task ---`}
          </div>
          :
          createTaskCards(tasks)
        }
      </TaskList>
    )
  })

  return (
    <div className='App'>
      <AddOrSearchWidget
        taskCount={allTasks.length}
        color='#22C55E'
        onTaskAdd={handleTaskAdd}
        onTaskSearch={handleTaskSearch}
      />
      <div className='task-lists'>
        {taskLists}
      </div>
    </div>
  )
}

export default App
