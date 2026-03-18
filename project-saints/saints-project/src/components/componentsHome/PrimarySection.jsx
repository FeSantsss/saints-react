import ProjectBox from './ProjectBox'

import '../../assets/primarySection.css'
import { useState, useEffect } from 'react'


const PrimarySection = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch("/ImagesPrimarySection.json")
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [])


  return (
    <>
      <section className="container-primary">
        <div className="div-title">
          <h2 className="title-section-one">
            nossos projetos
          </h2>
        </div>


        <div className="div-cards">
          {projects.map(project => (
            <ProjectBox
              key={project.id}
              image={project.image}
              content={project.content}
              
            />
          ))}
        </div>

      </section>
    </>
  )
}

export default PrimarySection