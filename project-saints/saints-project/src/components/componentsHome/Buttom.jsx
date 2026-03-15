import '../../assets/buttom.css'

const Buttom = ({ text, action }) => {
  return (
    <button onClick={action} className='button-box-design'>
      {text}
    </button>
  )
}

export default Buttom