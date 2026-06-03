import React, { useState } from 'react';
import { capitoli } from './data.jsx';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const goToNextPage = () => {
    if (currentPageIndex < capitoli.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const currentPage = capitoli[currentPageIndex];

  return (
    <div className="h-screen w-full bg-[#F4F1EA] text-[#2C2C2C] font-serif flex flex-col overflow-hidden select-none">
      
      {/* Header: Institutional Context */}
      <header className="w-full shrink-0 h-20 border-b border-[#D1CDC2] px-6 lg:px-12 flex items-center justify-between bg-[#FDFCF9]">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#8B8678]">Piattaforma Unica • Portfolio Digitale</span>
          <h1 className="text-xl lg:text-2xl font-black tracking-tight text-[#1A1A1A] font-serif uppercase">IL MIO CAPOLAVORO</h1>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[11px] font-sans font-semibold text-[#8B8678] block italic">Studente: Autore</span>
          <span className="text-[11px] font-sans text-[#A5A093] block">Anno Scolastico 2023/2024</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Navigation: The Table of Contents */}
        <aside className="w-full md:w-[300px] border-b md:border-b-0 md:border-r border-[#D1CDC2] p-8 flex flex-col justify-between bg-[#F9F7F2] shrink-0 overflow-y-auto">
          <div className="space-y-6 flex-1">
            <h3 className="text-[11px] uppercase tracking-[0.15em] font-sans font-bold text-[#A5A093] mb-4">Indice del Libro</h3>
            <div className="space-y-4">
              {capitoli.map((cap, index) => (
                <div 
                  key={cap.id}
                  onClick={() => setCurrentPageIndex(index)}
                  className={`group cursor-pointer relative ${index === currentPageIndex ? '' : 'opacity-60 hover:opacity-100'}`}
                >
                  {index === currentPageIndex && (
                    <div className="absolute -left-4 top-1 w-1 h-6 bg-[#D15D4D]"></div>
                  )}
                  <span className={`text-[10px] font-sans block mb-1 uppercase font-bold ${index === currentPageIndex ? 'text-[#D15D4D]' : 'text-[#8B8678]'}`}>
                    CAPITOLO {['I', 'II', 'III', 'IV', 'V'][index] || index + 1} {cap.title.split(': ')[0] === 'Epilogo' ? '(EPILOGO)' : ''}
                  </span>
                  <span className={`text-sm font-bold border-b transition-colors ${index === currentPageIndex ? 'text-[#1A1A1A] border-transparent' : 'text-[#1A1A1A] border-transparent group-hover:border-[#1A1A1A]'}`}>
                    {cap.title.split(': ')[1] || cap.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block p-6 bg-white border border-[#E8E6E1] rounded-lg shadow-sm mt-8">
            <p className="text-[12px] italic leading-relaxed text-[#5C584E]">"Credo sia l'emozione che solo un uomo libero può provare. Un uomo libero all'inizio di un lungo viaggio la cui conclusione è incerta. Spero..."</p>
            <p className="mt-3 text-[10px] font-sans font-bold text-[#A5A093] text-right uppercase tracking-wider">— Ellis Boyd 'Red' Redding<br/>Le ali della libertà (1994)</p>
          </div>
        </aside>

        {/* Content Area: The Page */}
        <main className="flex-1 relative bg-white overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.section 
              key={currentPage.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full min-h-full p-8 md:p-16 flex flex-col justify-center items-center relative"
            >
              <article className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl relative z-10 my-auto py-8 px-2 md:px-6">
                <div className="text-[50px] md:text-[70px] font-black text-[#E8E6E1] select-none leading-none mb-4">
                  {String(currentPageIndex + 1).padStart(2, '0')}
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight text-[#1A1A1A] font-serif">
                  {currentPage.title.split(': ')[1] || currentPage.title}
                </h2>
                
                <div className="space-y-6 text-[15px] leading-[1.7] text-[#4A4A4A] font-serif">
                  {currentPage.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Skills Section */}
                <div className="mt-12 pt-8 border-t border-[#F4F1EA]">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#A5A093] mb-4">
                    Competenze UNICA maturate in questa fase:
                  </h4>
                  <div className="flex flex-col gap-3">
                    {currentPage.competences.map((comp, idx) => (
                      <div key={idx} className="p-4 bg-[#F9F7F2] border border-[#D1CDC2] rounded text-[12px] font-sans font-semibold flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 shrink-0 rounded-full ${idx % 2 === 0 ? 'bg-[#D15D4D]' : 'bg-[#4D8BD1]'}`}></span>
                          <span className="text-[#1A1A1A]">{comp.name}</span>
                        </div>
                        <span className="text-[11px] font-normal text-[#5C584E] leading-relaxed block pl-4">
                          {comp.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </motion.section>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer: Progress and Navigation */}
      <footer className="w-full shrink-0 h-16 md:h-20 border-t border-[#D1CDC2] px-6 lg:px-12 flex items-center justify-between bg-[#FDFCF9]">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-1">
            {capitoli.map((cap, i) => {
              let bgColor = "bg-[#D1CDC2]";
              if (i < currentPageIndex) bgColor = "bg-[#2C2C2C]";
              else if (i === currentPageIndex) bgColor = "bg-[#D15D4D]";
              return <div key={cap.id} className={`w-6 lg:w-8 h-1 ${bgColor}`}></div>;
            })}
          </div>
          <span className="text-[11px] font-sans font-bold text-[#2C2C2C] uppercase">PAGINA {currentPageIndex + 1} DI {capitoli.length}</span>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <button 
             onClick={goToPrevPage}
             disabled={currentPageIndex === 0}
             className="px-4 md:px-6 py-2 border border-[#2C2C2C] text-[10px] md:text-[12px] font-sans font-bold hover:bg-[#2C2C2C] hover:text-white transition-colors uppercase disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#2C2C2C] cursor-pointer"
          >
            Capitolo Precedente
          </button>
          <button 
             onClick={goToNextPage}
             disabled={currentPageIndex === capitoli.length - 1}
             className="px-4 md:px-6 py-2 bg-[#D15D4D] text-white text-[10px] md:text-[12px] font-sans font-bold hover:bg-[#B04C3E] transition-colors uppercase disabled:opacity-50 cursor-pointer"
          >
             {currentPageIndex === capitoli.length - 1 ? 'Pubblica su Unica' : 'Capitolo Successivo'}
          </button>
        </div>
      </footer>
    </div>
  );
}
