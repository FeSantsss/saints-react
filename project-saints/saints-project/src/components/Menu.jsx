import '../assets/header.css'
import saintslogo from '../images/saints-logo.png'
import { useEffect, useState } from 'react'

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

        <nav className={isOpen ? 'nav-header-menu is-open' : 'nav-header-menu'}>

          <a className="link-interno" href='#' rel="noopener noreferrer">início</a>
          <a className="link-interno" href='#' rel="noopener noreferrer">projetos</a>
          <a className="link-interno" href='#' rel="noopener noreferrer">serviços</a>
          <a className="link-interno" href='#' rel="noopener noreferrer">sobre</a>

        </nav>

      </section>

    </header>
  )
}

export default Menu