import "../assets/chat.css";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";

/*
========================================
COMPONENTE DE MENSAGEM (MEMOIZADO)
========================================
Evita re-render desnecessário
*/
const Message = memo(({ tipo, texto }) => {
  return <div className={`msg ${tipo}`}>{texto}</div>;
});

/*
========================================
FLUXOS
========================================
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
/*
========================================
COMPONENTE PRINCIPAL
========================================
*/
export default function Chat() {
  /*
  ========================================
  ESTADOS
  ========================================
  */
  const [active, setActive] = useState(false);
  const [servico, setServico] = useState(null);
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [mensagens, setMensagens] = useState([]);

  const mensagensRef = useRef(null);
  const inputRef = useRef(null);

  /*
  ========================================
  RESET
  ========================================
  */
  const resetChat = useCallback(() => {
    setServico(null);
    setPasso(0);
    setRespostas({});
    setMensagens([]);
  }, []);

  /*
  ========================================
  TOGGLE
  ========================================
  */
  const toggleMenu = useCallback(() => {
    if (active) resetChat();
    setActive((prev) => !prev);
  }, [active, resetChat]);

  /*
  ========================================
  BOT / USER (MEMO)
  ========================================
  */
  const botMsg = useCallback((texto) => {
    setMensagens((prev) => [...prev, { tipo: "bot", texto }]);
  }, []);

  const userMsg = useCallback((texto) => {
    setMensagens((prev) => [...prev, { tipo: "user", texto }]);
  }, []);

  /*
  ========================================
  DATA FIX
  ========================================
  */
  function formatarData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  /*
  ========================================
  SERVIÇO
  ========================================
  */
  const selecionarServico = useCallback(
    (valor) => {
      setServico(valor);
      userMsg(fluxos[valor].title);
      setPasso(0);
    },
    [userMsg],
  );

  /*
  ========================================
  FLUXO
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
  }, [passo, servico, botMsg]);

  /*
  ========================================
  ENVIAR
  ========================================
  */
  const enviarResposta = useCallback(() => {
    if (!servico) return;

    const valor = inputRef.current?.value;
    if (!valor) return;

    const pergunta = fluxos[servico]?.perguntas?.[passo];

    setRespostas((prev) => ({
      ...prev,
      [pergunta.label]: valor,
    }));

    userMsg(valor);
    inputRef.current.value = "";

    setPasso((prev) => prev + 1);
  }, [servico, passo, userMsg]);

  /*
  ========================================
  FINAL
  ========================================
  */
  const finalizar = useCallback(() => {
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
  }, [respostas, servico]);

  /*
  ========================================
  INIT
  ========================================
  */
  useEffect(() => {
    if (!active) return;

    botMsg("Olá! Bem-vindo ao atendimento Saints.");
    botMsg("Qual serviço você deseja contratar?");
  }, [active, botMsg]);

  /*
  ========================================
  SCROLL
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
  INPUT
  ========================================
  */
  const renderInput = () => {
    const campo = fluxos[servico]?.perguntas?.[passo];
    if (!campo) return null;

    if (campo.type === "select") {
      return (
        <select ref={inputRef}>
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
      return <textarea ref={inputRef} />;
    }

    return <input type={campo.type} ref={inputRef} />;
  };

  /*
  ========================================
  JSX
  ========================================
  */
  return (
    <>
      {/* BOTÃO */}
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
                <button onClick={() => window.location.reload()}>↺</button>
                <button onClick={toggleMenu}>✕</button>
              </div>
            </div>

            {/* MENSAGENS */}
            <div className="mensagens" ref={mensagensRef}>
              {mensagens.map((m, i) => (
                <Message key={i} tipo={m.tipo} texto={m.texto} />
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
