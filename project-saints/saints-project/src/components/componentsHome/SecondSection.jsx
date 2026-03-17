import '../../assets/secondSection.css'
import {motion} from 'framer-motion' 



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
            src="https://pub-29c79b56b9f44c2a80b005bc022bef94.r2.dev/saints-images/saints-photos/about-one.JPEG" 
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
            loading='lazy'
          />

          <motion.img src="https://pub-29c79b56b9f44c2a80b005bc022bef94.r2.dev/saints-images/saints-photos/about-two.JPEG"
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
            loading='lazy'
          />

          <motion.img src="https://pub-29c79b56b9f44c2a80b005bc022bef94.r2.dev/saints-images/saints-photos/about-three.JPEG"
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
            loading='lazy'
          />
          <motion.img src="https://pub-29c79b56b9f44c2a80b005bc022bef94.r2.dev/saints-images/saints-photos/about-four.JPEG" 
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
            loading='lazy'
          />
        </div>

        
      </section>
    </>
  )
}

export default SecondSection