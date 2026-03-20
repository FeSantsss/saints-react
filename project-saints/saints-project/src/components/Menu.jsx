import '../assets/header.css'
import saintslogo from '../images/saints-logo.PNG'
import saintsLogoHover from '../images/saints-logo-hover.PNG'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const Menu = () => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
    } else {
      document.body.style.overflow = 'auto';
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setOpen(prev => !prev);
  }

  return (
    <header>
      <section className="container-header">

        <a>
          <img className="logo-icon-saints" alt="logo saints"
          loading="lazy" src={saintslogo}/>
        </a>
        
          
          <div className="burguer-menu" onClick={toggleMenu} >
            <div className={isOpen ? 'first-line active' : 'first-line'}></div>
            <div className={isOpen ? 'second-line active' : 'second-line'}></div>
          </div>

        <AnimatePresence>
          <motion.nav
            className={isOpen ? 'nav-header-menu is-open' : 'nav-header-menu'}
            initial={{opacity: 0, filter: "blur(20px)"}}
            whileInView={{opacity: 1, filter: "blur(0px)"}}
            transition={{duration: .5, ease: 'easeIn'}}
            exit={{opacity: 0, filter: "blur(10px)"}}
          >
            <NavLink className={({isActive}) => (isActive ? "link-interno active" : "link-interno")} to="/" onClick={() => setOpen(false)}>
              início
            </NavLink>
            <NavLink className={({isActive}) => (isActive ? "link-interno active" : "link-interno")} to="/serviços" onClick={() => setOpen(false)}>
              serviços
            </NavLink>
            <NavLink className={({isActive}) => (isActive ? "link-interno active" : "link-interno")} to="/projetos" onClick={() => setOpen(false)}>
              projetos
            </NavLink>
            <NavLink className={({isActive}) => (isActive ? "link-interno active" : "link-interno")} to="/about" onClick={() => setOpen(false)}>
              sobre
            </NavLink>
          </motion.nav>
        </AnimatePresence>

      </section>

    </header>
  )
}

export default Menu