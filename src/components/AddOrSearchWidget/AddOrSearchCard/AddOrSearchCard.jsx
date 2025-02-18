import { useState } from 'react'
import AutoSizingTextarea from '../../AutoSizingTextarea/AutoSizingTextarea'
// import { getCurrentDateTime } from '../../../utils/utils'
import './AddOrSearchCard.css'

const AddOrSearchCard = ({ color, action, deadlineInput, deadlineSearchFrom, deadlineSearchTo, title, content, onActionChange, onDeadlineChange, onDeadlineFromChange, onDeadlineToChange, onTitleChange, onContentChange, onTaskAddByEnter, onTaskSearchByEnter}) => {
    const [inFocus, setInFocus] = useState(false)

    const changeAction = event => {
        onActionChange(event.target.value)
    }
    
    const changeDeadline = event => {
        onDeadlineChange(event.target.value)
    }

    const changeDeadlineFrom = event => {
        onDeadlineFromChange(event.target.value)
    }

    const changeDeadlineTo = event => {
        onDeadlineToChange(event.target.value)
    }

    const changeTitle = event => {
        onTitleChange(event.target.value)
    }

    const changeContent = event => {
        onContentChange(event.target.value)
    }

    const addTaskByEnter = event => {
        onTaskAddByEnter(event.key)
    }

    const searchTaskByEnter = event => {
        onTaskSearchByEnter(event.key)
    }

    const highlightTaskInFocus = () => {
        document.querySelectorAll('.task').forEach(task => {
            task.classList.remove('task-in-focus')
        })
        setInFocus(true)
    }

    const unhighlightTaskOutFocus = () => {
        setInFocus(false)
    }

    return (
        <div
            className={`task${inFocus ? ' task-in-focus' : ''}`}
            style={{ 
                borderColor: inFocus ? color : '#E2E8F0',
                borderWidth: inFocus ? '2px' : '1px',
                backgroundColor: inFocus ? `${color}20` : 'white'
            }}
        >
            <select name='action-select' value={action} onChange={changeAction}>
                <option value='Add'>Add</option>
                <option value='Search'>Search</option>
            </select>
            <div className='widget-date-time-pickers'>
                {
                    action === 'Add' ?
                        <input
                            type='datetime-local'
                            // use current date & time as min value for datetime-local input
                            // min={getCurrentDateTime()}
                            value={deadlineInput}
                            data-placeholder='Pick a Deadline'
                            onChange={changeDeadline}
                            onFocus={highlightTaskInFocus}
                            onBlur={unhighlightTaskOutFocus}
                        /> :
                        <>
                            <input
                                type='datetime-local'
                                value={deadlineSearchFrom}
                                data-placeholder='From'
                                max={deadlineSearchTo}
                                onChange={changeDeadlineFrom}
                                onFocus={highlightTaskInFocus}
                                onBlur={unhighlightTaskOutFocus}
                            />
                            <input
                                type='datetime-local'
                                value={deadlineSearchTo}
                                data-placeholder='To'
                                min={deadlineSearchFrom}
                                onChange={changeDeadlineTo}
                                onFocus={highlightTaskInFocus}
                                onBlur={unhighlightTaskOutFocus}
                            />
                        </>
                }
            </div>
            <AutoSizingTextarea
                className='task-title'
                name='title'
                value={title}
                holderText='Any title ... and "Enter" ?'
                titleHint={`Support 'Enter' to ${action}`}
                onValueChange={changeTitle}
                onTaskFocus={highlightTaskInFocus}
                onTaskBlur={unhighlightTaskOutFocus}
                onEnterDown={action === 'Add' ? addTaskByEnter : searchTaskByEnter}
            />
            <AutoSizingTextarea
                className='task-content'
                name='content'
                value={content}
                holderText='Any content ... and "Enter" ?'
                titleHint={`Support 'Enter' to ${action}`}
                onValueChange={changeContent}
                onTaskFocus={highlightTaskInFocus}
                onTaskBlur={unhighlightTaskOutFocus}
                onEnterDown={action === 'Add' ? addTaskByEnter : searchTaskByEnter}
            />
        </div>
    )
}

export default AddOrSearchCard