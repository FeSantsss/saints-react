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

            <motion.svg 
              viewBox="0 0 200 200" 
              className="circle"
              initial={{
                opacity: 0,
                y: -50,
                filter: "blur(20px)"
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
              viewport={{ once: false }}  
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
            </motion.svg>

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