import { useState,useEffect} from 'react'
import Dashboard from './components/Dashboard'
import { Navigate,Route,Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Login from './components/LoginPage'



function App() {

  
  const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem('admin')))  // authUser contains user credentials from localstorage(saved when user sihned in)


  useEffect(() => {
    const handleAuthChange = () => {
      setAuthUser(JSON.parse(localStorage.getItem('admin')));
    };

    // Listen for authChange events
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);


  return (
    <>
    <Routes>
    <Route path="/" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
    <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login/>}/>
    </Routes>
     <Toaster/>
    </>
  )
}

export default App
