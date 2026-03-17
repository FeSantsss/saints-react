import '../../assets/secondSection.css'
import {motion} from 'framer-motion' 
import { useState, useEffect } from 'react'



const SecondSection = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/ImagesSecondSection.json")
      .then(res => res.json())
      .then(data => setImages(data))
  }, [])

  return (
    <>
      <section className="container-about">
        <h3 className="about-text-h3">

          <p>
            <strong>na Saints,</strong> <br />atuamos na construção intencional de imagem porque entendemos <br />que todo projeto nasce de posicionamento e clareza.
          </p>
        
          <p>
            trabalhamos próximos aos nossos clientes para definir o que precisa ser <br /> consolidado:
            autoridade,
            presença, 
            relevância.
          </p>
          
        </h3>

        <div className="images-review">
          {images.map((image) => (
            <motion.img
              src={image.image}
              key={image.id}
              className={image.class}
              alt="image for review section"

              initial={{
                opacity: 0,
                y: -80,
                filter: "blur(10px)"
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              transition={{
                duration: 1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              loading='lazy'
            />
          ))}

        </div>

        
      </section>
    </>
  )
}

export default SecondSection