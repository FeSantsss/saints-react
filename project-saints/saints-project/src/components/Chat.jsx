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
  const [active, setActive] = useState(false); // controla abertura do chat
  const [servico, setServico] = useState(null); // serviço escolhido
  const [passo, setPasso] = useState(0); // pergunta atual
  const [respostas, setRespostas] = useState({}); // respostas do usuário
  const [mensagens, setMensagens] = useState([]); // histórico visual
  const [inputValue, setInputValue] = useState(""); // valor do input atual

  const mensagensRef = useRef(null); // referência para scroll automático

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
    if (active) {
      resetChat(); // limpa tudo ao fechar
    }
    setActive((prev) => !prev);
  };

  /*
  ========================================
  BOT COM EFEITO DE DIGITAÇÃO
  ========================================
  */
  const botMsg = async (texto) => {
    // adiciona mensagem "digitando"
    setMensagens((prev) => [...prev, { tipo: "bot", texto: "", typing: true }]);

    // delay baseado no tamanho da mensagem (mais natural)
    await new Promise((res) => setTimeout(res, 600 + texto.length * 10));

    // substitui pela mensagem real
    setMensagens((prev) => {
      const copia = [...prev];
      copia[copia.length - 1] = { tipo: "bot", texto };
      return copia;
    });
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
  Problema:
  - input date retorna "YYYY-MM-DD"
  - new Date() converte para UTC → perde 1 dia

  Solução:
  - quebrar manualmente a string
  - montar data local correta
  */
  function formatarData(data) {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`; // formato BR correto
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

    // validação básica
    if (!pergunta || !inputValue.trim()) return;

    // salva resposta
    setRespostas((prev) => ({
      ...prev,
      [pergunta.label]: inputValue,
    }));

    userMsg(inputValue);
    setInputValue("");

    // avança fluxo
    setPasso((prev) => prev + 1);
  };

  /*
  ========================================
  FINALIZAÇÃO (ENVIO PARA WHATSAPP)
  ========================================
  */
  const finalizar = () => {
    const numero = "558799742168";

    let texto = "Olá! Quero contratar um serviço Saints:%0A";
    texto += `%0AServiço: ${fluxos[servico].title}%0A`;

    for (const k in respostas) {
      let valor = respostas[k];

      // corrige datas
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

    const start = async () => {
      await botMsg("Olá! Bem-vindo ao atendimento Saints.");
      await botMsg("Qual serviço você deseja contratar?");
    };

    start();
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
      {/* BOTÃO FLUTUANTE */}
      <motion.button
        className="chat-toggle"
        onClick={toggleMenu}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ y: { repeat: Infinity, duration: 2.5 } }}
      >
        <p className="p-in-chat-toggle">atendimento</p>
      </motion.button>

      {/* CHAT */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key="chat"
            className="chat-atendimento open"
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
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

            {/* MENSAGENS */}
            <div className="mensagens" ref={mensagensRef}>
              <AnimatePresence>
                {mensagens.map((m, i) => (
                  <motion.div
                    key={i}
                    className={`msg ${m.tipo}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {m.typing ? "..." : m.texto}
                  </motion.div>
                ))}
              </AnimatePresence>
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
                  <motion.button
                    onClick={enviarResposta}
                    whileTap={{ scale: 0.9 }}
                  >
                    Enviar
                  </motion.button>
                </>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
