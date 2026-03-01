import '../assets/header.css'
import saintslogo from '../images/saints-logo.png'
import { useState } from 'react'

const Menu = () => {

  return (
    <header>
      <section className="container-header">

        <a>
          <img className="logo-icon-saints" alt="logo saints"
          loading="lazy" src={saintslogo}/>
        </a>
        
          
          <div className="burguer-menu">
            <div className="first-line"></div>
            <div className="second-line"></div>
          </div>

        <nav className="nav-header-menu">

          <a className="link-interno" rel="noopener noreferrer"><u>início</u></a>
          <a className="link-interno" rel="noopener noreferrer">projetos</a>
          <a className="link-interno" rel="noopener noreferrer">serviços</a>
          <a className="link-interno" rel="noopener noreferrer">sobre</a>

        </nav>

      </section>

    </header>
  )
}

export default Menu