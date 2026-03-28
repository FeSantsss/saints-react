import "../assets/chat.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/*
========================================
DEFINIÇÃO DOS FLUXOS DO CHAT
========================================
Cada serviço possui:
- title → nome exibido
- perguntas → sequência de perguntas do bot
*/
const fluxos = {
  casamento: {
    title: "Casamento",
    perguntas: [
      { label: "Data do casamento:", name: "data", type: "date" },
      {
        label: "Formato:",
        name: "formato",
        type: "select",
        options: ["Cerimônia", "Festa", "Ambos"],
      },
      { label: "Convidados:", name: "convidados", type: "number" },
      { label: "Descreva brevemente:", name: "descricao", type: "textarea" },
    ],
  },
  reels: {
    title: "Reels para Redes Sociais",
    perguntas: [
      { label: "Nome da marca:", name: "marca", type: "text" },
      {
        label: "Objetivo:",
        name: "objetivo",
        type: "select",
        options: ["Engajamento", "Vendas", "Autoridade"],
      },
      { label: "Quantidade de vídeos:", name: "quantidade", type: "number" },
      { label: "Descreva brevemente:", name: "descricao", type: "textarea" },
    ],
  },
  Aereo: {
    title: "Vídeo Aéreo",
    perguntas: [
      { label: "Local:", name: "local", type: "text" },
      { label: "Data:", name: "data", type: "date" },
      {
        label: "Área:",
        name: "area",
        type: "select",
        options: ["Urbana", "Rural"],
      },
      { label: "Descreva brevemente:", name: "descricao", type: "textarea" },
    ],
  },
  evento: {
    title: "Evento",
    perguntas: [
      {
        label: "Tipo de evento:",
        name: "tipo",
        type: "select",
        options: ["Aniversário", "Formatura", "Corporativo", "Esportivo"],
      },
      { label: "Data:", name: "data", type: "date" },
      { label: "Duração (horas):", name: "duracao", type: "number" },
      { label: "Descreva brevemente:", name: "descricao", type: "textarea" },
    ],
  },
};

export default function Chat() {
  /*
  ========================================
  ESTADOS PRINCIPAIS
  ========================================
  */
  const [active, setActive] = useState(false);
  const [servico, setServico] = useState(null);
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [mensagens, setMensagens] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const mensagensRef = useRef(null);

  /*
  ========================================
  RESET COMPLETO DO CHAT
  ========================================
  */
  const resetChat = () => {
    setServico(null);
    setPasso(0);
    setRespostas({});
    setMensagens([]);
    setInputValue("");
  };

  /*
  ========================================
  ABRIR / FECHAR CHAT
  ========================================
  */
  const toggleMenu = () => {
    if (active) resetChat();
    setActive((prev) => !prev);
  };

  /*
  ========================================
  BOT (SIMPLIFICADO - 1 RENDER)
  ========================================
  Remove delay e múltiplos renders → muito mais leve
  */
  const botMsg = (texto) => {
    setMensagens((prev) => [...prev, { tipo: "bot", texto }]);
  };

  /*
  ========================================
  MENSAGEM DO USUÁRIO
  ========================================
  */
  const userMsg = (texto) => {
    setMensagens((prev) => [...prev, { tipo: "user", texto }]);
  };

  /*
  ========================================
  CORREÇÃO DO BUG DE DATA (TIMEZONE)
  ========================================
  */
  function formatarData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  /*
  ========================================
  SELEÇÃO DE SERVIÇO
  ========================================
  */
  function selecionarServico(valor) {
    setServico(valor);
    userMsg(fluxos[valor].title);
    setPasso(0);
  }

  /*
  ========================================
  CONTROLE DO FLUXO AUTOMÁTICO
  ========================================
  */
  useEffect(() => {
    if (!servico) return;

    const perguntas = fluxos[servico].perguntas;

    if (passo < perguntas.length) {
      botMsg(perguntas[passo].label);
    } else {
      finalizar();
    }
  }, [passo, servico]);

  /*
  ========================================
  ENVIO DE RESPOSTA
  ========================================
  */
  const enviarResposta = () => {
    if (!servico) return;

    const pergunta = fluxos[servico]?.perguntas?.[passo];
    if (!pergunta || !inputValue.trim()) return;

    setRespostas((prev) => ({
      ...prev,
      [pergunta.label]: inputValue,
    }));

    userMsg(inputValue);
    setInputValue("");
    setPasso((prev) => prev + 1);
  };

  /*
  ========================================
  FINALIZAÇÃO (WHATSAPP)
  ========================================
  */
  const finalizar = () => {
    const numero = "558799742168";

    let texto = "Olá! Quero contratar um serviço Saints:%0A";
    texto += `%0AServiço: ${fluxos[servico].title}%0A`;

    for (const k in respostas) {
      let valor = respostas[k];
      if (k.toLowerCase().includes("data")) {
        valor = formatarData(valor);
      }
      texto += `${k} ${valor}%0A`;
    }

    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
  };

  /*
  ========================================
  MENSAGENS INICIAIS
  ========================================
  */
  useEffect(() => {
    if (!active) return;

    botMsg("Olá! Bem-vindo ao atendimento Saints.");
    botMsg("Qual serviço você deseja contratar?");
  }, [active]);

  /*
  ========================================
  SCROLL AUTOMÁTICO
  ========================================
  */
  useEffect(() => {
    mensagensRef.current?.scrollTo({
      top: mensagensRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensagens]);

  /*
  ========================================
  RENDER DINÂMICO DE INPUT
  ========================================
  */
  const renderInput = () => {
    const campo = fluxos[servico]?.perguntas?.[passo];
    if (!campo) return null;

    if (campo.type === "select") {
      return (
        <select
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        >
          <option value="">Selecione</option>
          {campo.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (campo.type === "textarea") {
      return (
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      );
    }

    return (
      <input
        type={campo.type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    );
  };

  /*
  ========================================
  JSX (INTERFACE)
  ========================================
  */
  return (
    <>
      {/* BOTÃO FLUTUANTE (leve, sem animação infinita) */}
      <motion.button
        className="chat-toggle"
        onClick={toggleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="p-in-chat-toggle">atendimento</p>
      </motion.button>

      {/* CHAT */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="chat"
            className="chat-atendimento open"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* HEADER */}
            <div className="chat-header">
              <span className="span-in-chat">Saints Atendimento</span>
              <div className="chat-actions">
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  ↺
                </button>
                <button onClick={toggleMenu}>✕</button>
              </div>
            </div>

            {/* MENSAGENS (SEM ANIMAÇÃO → MUITO MAIS LEVE) */}
            <div className="mensagens" ref={mensagensRef}>
              {mensagens.map((m, i) => (
                <div key={i} className={`msg ${m.tipo}`}>
                  {m.texto}
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="input-area">
              {!servico ? (
                <select onChange={(e) => selecionarServico(e.target.value)}>
                  <option value="">Selecione</option>
                  {Object.entries(fluxos).map(([key, fluxo]) => (
                    <option key={key} value={key}>
                      {fluxo.title}
                    </option>
                  ))}
                </select>
              ) : passo < fluxos[servico].perguntas.length ? (
                <>
                  {renderInput()}
                  <button onClick={enviarResposta}>Enviar</button>
                </>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
