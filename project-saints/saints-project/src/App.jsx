import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu'
import Chat from './components/Chat'
import Footer from './components/Footer'
import ScrollBar from './components/ScrollBar'

function App() {

  return (
    <>
      <Menu/>
      <ScrollBar/>
      
      <main><Outlet/></main>

      <Chat/>
      <Footer/>
    </>
  )
}

export default App
