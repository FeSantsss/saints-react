import "../../assets/chat.css";

// ! Hooks principais do React
// ? useState → controla estados internos do componente
// ? useEffect → executa efeitos colaterais
// ? useRef → cria referência para acessar elementos do DOM
import { useState, useEffect, useRef } from "react";


// * ===============================
// * DEFINIÇÃO DOS FLUXOS DE PERGUNTAS
// * ===============================

// ? Cada serviço contém um array de perguntas.
// ? label → texto exibido pelo bot
// ? name → identificador interno
// ? type → tipo do campo
// ? options → opções para select
const fluxos = {
  casamento: [
    { label: "Data do casamento:", name: "data", type: "date" },
    { label: "Formato:", name: "formato", type: "select", options: ["Cerimônia", "Festa", "Ambos"] },
    { label: "Convidados:", name: "convidados", type: "number" },
    { label: "Descreva brevemente:", name: "descricao", type: "textarea" }
  ],
  reels: [
    { label: "Nome da marca:", name: "marca", type: "text" },
    { label: "Objetivo:", name: "objetivo", type: "select", options: ["Engajamento", "Vendas", "Autoridade"] },
    { label: "Quantidade de vídeos:", name: "quantidade", type: "number" },
    { label: "Descreva brevemente:", name: "descricao", type: "textarea" }
  ],
  Aereo: [
    { label: "Local:", name: "local", type: "text" },
    { label: "Data:", name: "data", type: "date" },
    { label: "Área:", name: "area", type: "select", options: ["Urbana", "Rural"] },
    { label: "Descreva brevemente:", name: "descricao", type: "textarea" }
  ],
  evento: [
    { label: "Tipo de evento:", name: "tipo", type: "select", options: ["Aniversário", "Formatura", "Corporativo", "Esportivo"] },
    { label: "Data:", name: "data", type: "date" },
    { label: "Duração (horas):", name: "duracao", type: "number" },
    { label: "Descreva brevemente:", name: "descricao", type: "textarea" }
  ]
};

export default function Chat() {

  // * ===============================
  // * ESTADOS PRINCIPAIS
  // * ===============================

  // ! Controla se o chat está aberto ou fechado
  const [active, setActive] = useState(false);

  // ! Serviço selecionado pelo usuário
  const [servico, setServico] = useState(null);

  // ! Índice da pergunta atual dentro do fluxo
  const [passo, setPasso] = useState(0);

  // ! Armazena todas as respostas fornecidas
  const [respostas, setRespostas] = useState({});

  // ! Armazena todas as mensagens exibidas (bot + usuário)
  const [mensagens, setMensagens] = useState([]);

  // ! Controla valor atual do input
  const [inputValue, setInputValue] = useState("");

  // ! Referência para scroll automático
  const mensagensRef = useRef(null);


  // * ===============================
  // * FUNÇÕES AUXILIARES
  // * ===============================

  // ? Alterna o estado do chat
  const toggleMenu = () => setActive(prev => !prev);

  // ? Adiciona mensagem do bot
  const botMsg = (texto) => {
    setMensagens(prev => [...prev, { tipo: "bot", texto }]);
  };

  // ? Adiciona mensagem do usuário
  const userMsg = (texto) => {
    setMensagens(prev => [...prev, { tipo: "user", texto }]);
  };


  // * ===============================
  // * SELEÇÃO DE SERVIÇO
  // * ===============================

  // ! Executado quando o usuário escolhe o serviço
  function selecionarServico(valor) {
    setServico(valor);

    // ? Capitaliza primeira letra
    const formatado =
      valor.charAt(0).toUpperCase() + valor.slice(1);

    userMsg(`${formatado}`);

    // ! Reinicia fluxo
    setPasso(0);
  }


  // * ===============================
  // * CONTROLE DO FLUXO AUTOMÁTICO
  // * ===============================

  useEffect(() => {

    // @flow Se ainda houver perguntas
    if (servico && passo < fluxos[servico].length) {
      const pergunta = fluxos[servico][passo];
      botMsg(pergunta.label);
    }

    // @flow Se terminou todas as perguntas
    if (servico && passo === fluxos[servico].length) {
      finalizar();
    }

  }, [passo, servico]);


  // * ===============================
  // * ENVIO DE RESPOSTA
  // * ===============================

  const enviarResposta = () => {

    if (!servico) return;

    const pergunta = fluxos[servico]?.[passo];

    // ! Validação básica
    if (!pergunta || !inputValue.trim()) return;

    // ? Salva resposta
    setRespostas(prev => ({
      ...prev,
      [pergunta.label]: inputValue
    }));

    userMsg(inputValue);

    setInputValue("");

    // ! Avança fluxo
    setPasso(prev => prev + 1);
  };


  // * ===============================
  // * FINALIZAÇÃO (WHATSAPP)
  // * ===============================

  const finalizar = () => {

    const numero = "5587996394734";

    let texto = "Olá! Quero contratar um serviço Saints:%0A";
    texto += `%0AServiço: ${servico}%0A`;

    for (const k in respostas) {
      texto += `${k} ${respostas[k]}%0A`;
    }

    // ! Redirecionamento externo
    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
  };


  // * ===============================
  // * MENSAGENS INICIAIS
  // * ===============================

  useEffect(() => {
    if (active && mensagens.length === 0) {
      botMsg("Olá! Bem-vindo ao atendimento Saints.");

      setTimeout(() => {
        botMsg("Qual serviço você deseja contratar?");
      }, 600);
    }
  }, [active]);


  // * ===============================
  // * SCROLL AUTOMÁTICO
  // * ===============================

  useEffect(() => {
    mensagensRef.current?.scrollTo({
      top: mensagensRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [mensagens]);


  // * ===============================
  // * RENDER DINÂMICO DE INPUT
  // * ===============================

  const renderInput = () => {

    const campo = fluxos[servico]?.[passo];

    if (!campo) return null;

    // ? Select
    if (campo.type === "select") {
      return (
        <select value={inputValue} onChange={(e) => setInputValue(e.target.value)}>
          <option value="">Selecione</option>
          {campo.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    // ? Textarea
    if (campo.type === "textarea") {
      return (
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      );
    }

    // ? Input padrão
    return (
      <input
        type={campo.type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    );
  };


  // * ===============================
  // * JSX
  // * ===============================

  return (
    <>
      {/* ! Botão fixo que abre o chat */}
      <button className="chat-toggle" onClick={toggleMenu}>
        <p className="p-in-chat-toggle">Agende seu projeto</p>
      </button>

      {/* ! Container principal */}
      <div className={active ? "chat-atendimento open" : "chat-atendimento"}>

        {/* * Header */}
        <div className="chat-header">
          <span className="span-in-chat">Saints Atendimento</span>

          <div className="chat-actions">
            {/* ! Reset completo */}
            <button onClick={() => {window.location.reload()}}>↺</button>

            {/* ! Fecha chat */}
            <button onClick={toggleMenu}>✕</button>
          </div>
        </div>

        {/* * Área de mensagens */}
        <div className="mensagens" ref={mensagensRef}>
          {mensagens.map((m, i) => (
            <div key={i} className={`msg ${m.tipo}`}>
              {m.texto}
            </div>
          ))}
        </div>

        {/* * Área de input */}
        <div className="input-area">

          {!servico ? (

            <select onChange={(e) => selecionarServico(e.target.value)}>
              <option value="">Selecione</option>
              {Object.keys(fluxos).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>

          ) : passo < fluxos[servico].length ? (

            <>
              {renderInput()}
              <button onClick={enviarResposta}>Enviar</button>
            </>

          ) : null}

        </div>
      </div>
    </>
  );
}