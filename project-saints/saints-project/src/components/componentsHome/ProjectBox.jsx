import { motion } from "framer-motion";
import "../../assets/projectBox.css";
import Buttom from "./Buttom";

const ProjectBox = ({ image, content }) => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: "easeIn",
        }}
        viewport={{ once: false }}
        loading="lazy"
      >
        <div className="project-box">
          <img
            className="image-for-project-box"
            src={image}
            alt="image of project"
            loading="lazy"
          />
        </div>
        <h2 className="content-box-design">{content}</h2>
        <Buttom text={"ver case"} />
      </motion.div>
    </>
  );
};

export default ProjectBox;
