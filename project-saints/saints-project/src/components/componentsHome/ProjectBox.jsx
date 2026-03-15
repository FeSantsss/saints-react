import '../../assets/projectBox.css'
import Buttom from './Buttom'

const ProjectBox = ({ image , content}) => {
  return (
    <>
      <div>
        <div className="project-box">
          <img className='image-for-project-box' src={image} alt="image of project" />
        </div>
        <h2 className='content-box-design'>{content}</h2>
        <Buttom text={"ver mais"}/>
      </div>
    </>
  )
}

export default ProjectBox