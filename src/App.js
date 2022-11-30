import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import TaskList from "./components/TaskList";
export const url = process.env.REACT_APP_URL_SERVER

function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TaskList/>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default App;
