import Footer from '../components/Footer'
import Menu from '../components/Menu'
import ScrollBar from '../components/ScrollBar'
import Chat from '../components/Chat'
import Hero from '../components/componentsHome/Hero'
import PrimarySection from '../components/componentsHome/PrimarySection'
import SecondSection from '../components/componentsHome/SecondSection'

const Home = () => {
  return (
    <>
      <Menu/>
      <ScrollBar/>
      <Chat/>
      <Hero/>
      <PrimarySection/>
      <SecondSection/>
      <Footer/> 
    </>
  )
}

export default Home