import { capitalizeSentence } from "../../utils/utils"
import './TaskListBar.css'

const TaskListBar = ({ count, barTitle, color }) => (
    <div className='task-list-bar' style={{ backgroundColor: color }}>
        <div className='bar-circle' style={{ color: color }}>{count}</div>
        <div className='bar-title'>{capitalizeSentence(barTitle)}</div>
    </div>
)

export default TaskListBar