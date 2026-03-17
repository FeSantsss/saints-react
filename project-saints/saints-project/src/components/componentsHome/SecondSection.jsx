import '../../assets/secondSection.css'
import {motion} from 'framer-motion' 

import aboutOne from '../../images/about-one.JPEG'
import aboutTwo from '../../images/about-two.JPEG'
import aboutThree from '../../images/about-three.JPEG'
import aboutFour from '../../images/about-four.JPEG'


const SecondSection = () => {
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

          <motion.img 
            src={aboutOne} 
            className='image-review image-review-one' 
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
          />

          <motion.img src={aboutTwo} 
            className='image-review image-review-two' 
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
          />

          <motion.img src={aboutThree} 
            className='image-review image-review-three' 
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
          />
          <motion.img src={aboutFour} 
            className='image-review image-review-four'  
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
          />
        </div>

        
      </section>
    </>
  )
}

export default SecondSection