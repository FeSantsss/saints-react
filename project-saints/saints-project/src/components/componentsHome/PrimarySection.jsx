import ProjectBox from './ProjectBox'

import '../../assets/primarySection.css'

import imageOne from '../../images/image-one.JPEG'
import imageTwo from '../../images/image-two.JPEG'
import imageThree from '../../images/image-three.JPEG'


const PrimarySection = () => {
  return (
    <>
      <section className="container-primary">
        <div className="div-title">
          <h2 className="title-section-one">
            nossos projetos
          </h2>
          <p className='about-title-section-one'>Não entregamos vídeos. Construímos presença.</p>
        </div>


        <div className="div-cards">
          <ProjectBox image={imageOne} content={"conteúdo para redes"}/>
          <ProjectBox image={imageTwo} content={"cobertura de eventos"}/>
          <ProjectBox image={imageThree} content={"campanhas corporativas"}/>
        </div>

      </section>
    </>
  )
}

export default PrimarySection