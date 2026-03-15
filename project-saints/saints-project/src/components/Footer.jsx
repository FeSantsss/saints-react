import "../assets/footer-base.css"
import { useState } from "react"
import instagramIcon from "../images/instagram.PNG"
import telephoneIcon from "../images/telephone-call.PNG"
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
          Entre em contato conosco!
        </p>

        <div className="container-contact-footer">
          <p className="mail-p">saintsfilmsbr@gmail.com</p>
          <p className="location-p">Custódia, PE</p>
          <a href="https://www.instagram.com/saintsfilmsbr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="link-externo"><img src={instagramIcon} alt="" className="icon-contact" /></a>
          <img src={telephoneIcon} alt="" className="icon-contact" />
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