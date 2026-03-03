import "../assets/footer-base.css"
import { useState } from "react"
import instagramIcon from "../images/instagram.png"
import telephoneIcon from "../images/telephone-call.png"
import locationIcon from "../images/location.png"
import emailIcon from "../images/mail.png"

const Footer = () => {
  const [active, setActive] = useState(false);

  const openMenu = () => {
    setActive(prev => !prev);
  }

  return (
    <footer id="sobre">
    <div className="container-division"></div>

    <section className="container-footer" aria-labelledby="footer-contact">
      <p className="p-global">
        Gostaria de saber mais? Entre em contato conosco!
      </p>

      <div className="container-contact-footer">
        <button className="contact-toggle" 
                aria-expanded={active} 
                aria-controls="contact-list"
                onClick={openMenu}>
          <p className="p-global" id="special">Contatos</p> 
        </button>

        <ul className={active ? 'ul-global is-open' : 'ul-global'} id="contact-list">
          <li>
            <img src={instagramIcon} className="icon-contact" />
            <p className="p-normal">
              Instagram:
              <a target="_blank" className="link-external" href="https://www.instagram.com/saintsfilmsbr">
                @saintsfilmsbr
              </a>
            </p>
          </li>
          <li>
            <img src={telephoneIcon} className="icon-contact" />
            <p className="p-normal">Telefone: +55 (87) 0000-0000</p>
          </li>
          <li>
            <img src={emailIcon} className="icon-contact" />
            <p className="p-normal">Email: saintsfilmsbr@saints.com</p>
          </li>
          <li>
            <img src={locationIcon} className="icon-contact" />
            <p className="p-normal">Endereço: Custódia-PE (Brasil)</p>
          </li>
        </ul>
      </div>

      <div className="container-division"></div>

      <p id="p-direitosreserv">
        Copyright © 2024-2026 Saints Films Digital (All Right Reserved) CNPJ:
        XX.XXX.XXX/XXXX-XX - Brasil
      </p>
    </section>
  </footer>
  )
}

export default Footer