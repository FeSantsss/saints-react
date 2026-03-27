import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "../assets/about-page.css";

const About = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetch("/imageAbout.json")
      .then((res) => res.json())
      .then((data) => setImage(data));
  }, []);

  return (
    <>
      <title>Saints Films | Sobre</title>
      <motion.div
        className="section-about"
        initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <h2>
          <p className="title-about-page">somos a saints.</p>
          <p className="text-about-page">
            A Saints é uma produtora audiovisual orientada a posicionamento.
          </p>
          <p className="text-about-page">
            Atuamos na construção estratégica de imagem para marcas, empresas e
            profissionais que precisam consolidar presença com clareza e
            direção.
          </p>
          <p className="text-about-page">
            Com abordagem estética intencional, desenvolvemos filmes, coberturas
            e narrativas visuais alinhadas a objetivos de percepção e
            autoridade.
          </p>
          <p className="text-about-page">
            Cada projeto é estruturado com consistência e propósito, para
            transformar imagem em presença.
          </p>
        </h2>

        {image.map((image, index) => (
          <img
            key={index}
            src={image.image}
            className={image.className}
            alt="saints team image"
          />
        ))}
      </motion.div>
    </>
  );
};

export default About;
