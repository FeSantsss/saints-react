import Footer from '../components/Footer'
import Menu from '../components/Menu'
import ScrollBar from '../components/ScrollBar'
import Chat from '../components/Chat/Chat'

const Home = () => {
  return (
    <>
      <Menu/>
      <ScrollBar/>
      <Chat/> 
      <div style={{height: "750px"}}></div>
      <Footer/> 
    </>
  )
}

export default Home