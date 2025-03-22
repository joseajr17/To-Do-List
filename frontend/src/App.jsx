import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { TaskList } from './components/TaskList';
import { AuthProvider } from './context/auth';
import { AppRouter } from './routes';

function App() {
  return (
    <div className='flex flex-col bg-gray-800 font-mono text-white min-h-screen min-w-screen'>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  )
}

export default App
