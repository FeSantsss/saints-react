import '../../assets/chat.css'
import { useState, useEffect } from 'react'

const Chat = () => {
  const [active, setActive] = useState(false);
  const toggleMenu = () => {
    setActive(prev => !prev);
  }

  return (
    <>
      <button id="chat-toggle" onClick={toggleMenu} aria-label="Abrir atendimento">
        <p id="p-in-chat-toggle">Agende seu projeto</p>
      </button>

      <div className={active ? 'chat-atendimento open' : 'chat-atendimento'}>
        <div className="chat-header">
          <span className="span-in-chat">Saints Atendimento</span>
          <div className="chat-actions">
            <button onClick={(active) => {window.location.reload()}} id="reset-chat">↺</button>
            <button id="close-chat" onClick={toggleMenu}>✕</button>
          </div>
        </div>

        <div id="mensagens"></div>
        <div id="input-area"></div>
      </div>
    </>
  )
}

export default Chat