import ProjectBox from './ProjectBox'

import '../../assets/primarySection.css'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'


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
          <div className="title-wrapper">
            

            <h2 className="title-section-one">
              nossos projetos
            </h2>

            <svg 
              viewBox="0 0 200 200" 
              className="circle" 
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100
                    m -75, 0
                    a 75,75 0 1,1 150,0
                    a 75,75 0 1,1 -150,0"
                />
              </defs>

              <text>
                <textPath href="#circlePath">
                  TESTE • TESTE • TESTE • TESTE • TESTE • TESTE
                </textPath>
              </text>
            </svg>

          </div>
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