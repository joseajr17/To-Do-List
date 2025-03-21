import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { TaskList } from './components/TaskList';
import { AppRouter } from './routes';

function App() {
  
  return (
    <div className='flex flex-col dark:bg-gray-800 font-mono text-white min-h-screen min-w-screen'>
      
      <AppRouter />

      {/* <Header />
      <TaskList /> */}
    </div>
  )
}

export default App
