import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { TaskList } from './components/TaskList';

function App() {
  
  return (
    <div className='flex flex-col dark:bg-gray-800 font-mono text-white min-h-screen min-w-screen'>
      
      <LoginForm />

      {/* <Header />
      <TaskList /> */}
    </div>
  )
}

export default App
