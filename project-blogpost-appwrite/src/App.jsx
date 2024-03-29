import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import './App.css'
// import config from './config/config';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index';


function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL);
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  // console.log(config.appWriteUrl);

  const [ loading, setLoading ] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then(
      (userData) => {
        if(userData){
          dispatch(login({
            userData
          }))
        }
        else{
          dispatch(logout())
        }
      }
    )
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex-wrap bg-gray-400'>
        <div className='w-full block'>
          <Header /> 
          <main>
            {/* <Outlet /> */}
          </main>
          <Footer />
        </div>
    </div>
  ) : null
}

export default App
