import TaskListBar from "../TaskListBar/TaskListBar"
import './TaskList.css'

const TaskList = ({ listClasses, barTitle, taskCount, color, children }) => (
    <div key={barTitle} className={listClasses} style={{ backgroundColor: `${color}11` }}>
        <TaskListBar count={taskCount} barTitle={barTitle} color={color} />
        {children}
    </div>
)

export default TaskList