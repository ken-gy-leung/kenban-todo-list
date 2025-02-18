// import { getCurrentDateTime } from '../utils/utils'
import {useState} from 'react'
import './AddOrSearchWidget.css'
import TaskList from '../TaskList/TaskList'
import AddOrSearchCard from './AddOrSearchCard/AddOrSearchCard'

const AddOrSearchWidget = ({ taskCount, color, onTaskAdd, onTaskSearch }) => {
  const [action, setAction] = useState('Add')
  const [deadlineInput, setDeadlineInput] = useState('')
  const [deadlineSearchFrom, setDeadlineSearchFrom] = useState('')
  const [deadlineSearchTo, setDeadlineSearchTo] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [contentInput, setContentInput] = useState('')

  const handleActionChange = value => {
    setAction(value)
    if (!!deadlineInput) {
      setDeadlineSearchFrom(deadlineInput)
    }
  }

  const handleDeadlineChange = value => {
    setDeadlineInput(value)
  }

  const handleDeadlineFromChange = value => {
    setDeadlineSearchFrom(value)
  }

  const handleDeadlineToChange = value => {
    setDeadlineSearchTo(value)
  }

  const handleTitleInputChange = value => {
    setTitleInput(value)
  }

  const handleContentInputChange = value => {
    setContentInput(value)
  }

  const handleReset = () => {
    setDeadlineSearchFrom('')
    setDeadlineSearchTo('')
    setDeadlineInput('')
    setTitleInput('')
    setContentInput('')
    onTaskSearch('', '', '', '')
  }

  const handleTaskAdd = () => {
    // title is required for adding a task
    if (titleInput === '') return
    onTaskAdd(deadlineInput, titleInput, contentInput)
    setDeadlineInput('')
    setTitleInput('')
    setContentInput('')
  }

  // use Enter key to add task
  const handleTaskAddByEnter = key => {
    if(key === 'Enter'){
      handleTaskAdd()
    }
  }
  
  const handleTaskSearch = () => {
    onTaskSearch(deadlineSearchFrom, deadlineSearchTo, titleInput, contentInput)
  }

  // use Enter key to search task
  const handleTaskSearchByEnter = key => {
    if(key === 'Enter'){
      handleTaskSearch()
    }
  }

  return (
    <TaskList
      listClasses='add-or-search-widget'
      barTitle='add or search'
      taskCount={taskCount}
      color={color}
    >
      <AddOrSearchCard
        color={color}
        action={action}
        deadlineInput={deadlineInput}
        deadlineSearchFrom={deadlineSearchFrom}
        deadlineSearchTo={deadlineSearchTo}
        title={titleInput}
        content={contentInput}
        onActionChange={handleActionChange}
        onDeadlineChange={handleDeadlineChange}
        onDeadlineFromChange={handleDeadlineFromChange}
        onDeadlineToChange={handleDeadlineToChange}
        onTitleChange={handleTitleInputChange}
        onContentChange={handleContentInputChange}
        onTaskAddByEnter={handleTaskAddByEnter}
        onTaskSearchByEnter={handleTaskSearchByEnter}
      >
      </AddOrSearchCard>
      <div className="widget-action-buttons">
        <button
          name='action-button'
          onClick={action === 'Add' ? handleTaskAdd : handleTaskSearch}>{action}
        </button>
        <button
          name='reset-button'
          onClick={handleReset}>Reset
        </button>
      </div>
    </TaskList>
  )
}

export default AddOrSearchWidget