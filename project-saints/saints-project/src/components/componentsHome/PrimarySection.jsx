import ProjectBox from './ProjectBox'

import '../../assets/primarySection.css'


const PrimarySection = () => {
  return (
    <>
      <section className="container-primary">
        <div className="div-title">
          <h2 className="title-section-one">
            nossos projetos
          </h2>
        </div>


        <div className="div-cards">
          <ProjectBox image="https://pub-29c79b56b9f44c2a80b005bc022bef94.r2.dev/saints-images/saints-photos/image-one.JPEG" content={"conteúdo para redes"}/>
          <ProjectBox image="https://pub-29c79b56b9f44c2a80b005bc022bef94.r2.dev/saints-images/saints-photos/image-two.JPEG" content={"cobertura de eventos"}/>
          <ProjectBox image="https://pub-29c79b56b9f44c2a80b005bc022bef94.r2.dev/saints-images/saints-photos/image-three.JPEG" content={"campanhas corporativas"}/>
        </div>

      </section>
    </>
  )
}

export default PrimarySection