import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/signUp'
import Home from './components/Home'
const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/SignUp',
    element: <SignUp/>
  }
])

function App() {

  return (
    <div>
      <RouterProvider router = {appRouter}/>
    </div>
  )
}

export default App
