import Footer from '../components/Footer'
import Menu from '../components/Menu'
import ScrollBar from '../components/ScrollBar'

const Home = () => {
  return (
    <>
      <Menu/>
      <ScrollBar/>
      <div style={{height: "750px"}}></div>
      <Footer/> 
    </>
  )
}

export default Home