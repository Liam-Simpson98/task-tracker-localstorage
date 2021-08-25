import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [update, setUpdate] = useState(false);

  const updateStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  //This is used to update local storage, because the functions are weird.
  if (update) {
    updateStorage();
    setUpdate(false);
  }

  //Get tasks (if any) from local storage
  useEffect(() => {
    const getTasks = () => {
      if (localStorage.getItem('tasks') !== null) {
        setTasks(JSON.parse(localStorage.getItem('tasks') || []));
      }
    };
    getTasks();
  }, []);

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
    setUpdate(true);
  };

  // Delete Task Function
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setUpdate(true);
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
    setUpdate(true);
  };

  return (
    <Router>
      <div className='Container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
