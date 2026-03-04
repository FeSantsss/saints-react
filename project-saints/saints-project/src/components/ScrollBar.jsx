import { useRef, useEffect } from "react"

const ScrollBar = () => {
  const thumbRef = useRef(null); // pega a referência(o elemento) que vai ser utilizada(o)

  useEffect(() => {

    const handleScroll = () => {
      const scrollTop = window.scrollY; {/* Quanto já rolou para baixo */}
      const docHeight = document.body.scrollHeight - window.innerHeight; 
      {/* 
        document.body.scrollHeight -> tamanho total do site 
        window.innerHeight -> quantos pxs estão sendo mostrados na tela 
          EX: 2000px - 800px = 1200px restantes de página para rolar
      */}
      const progress = scrollTop / docHeight; 
      {/* 
        o progresso será de 0 a 1, sendo 0 = início e 1 = fim
        logo, se já rolou 300px(scrollTop) e o restante para rolar é 1200px(docHeight)
        -> 0.25 ou 1/4 da página já foi rolada
      */}

      if (thumbRef.current) { {/* faz com que só suceda caso o thumbRef tenha referência */}
        thumbRef.current.style.transform = `scaleY(${progress})`; {/* a barra cresce/diminui de acordo com o progress */}
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); {/* faz o site escutar a função a partir do scroll */}

    return () => {
      window.removeEventListener("scroll", handleScroll); {/* se o componente quebrar, remove a função */}
    };
  }, []);
  

  return (

    <div className="scrollbar">
      <div className="thumb" ref={thumbRef}></div>
    </div>
  )
}

export default ScrollBar