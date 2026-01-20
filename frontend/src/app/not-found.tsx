'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import Spline from '@splinetool/react-spline';

export default function NotFound() {
    const router = useRouter();

    return (
        // min-h-screen asegura que cubra todo el alto en móviles, flex-col apila verticalmente
        <div className="min-h-screen w-full bg-[#0B1121] flex flex-col relative overflow-x-hidden">
            
            {/* 
               1. SECCIÓN 3D (ARRIBA) 
               - Mobile: h-[45vh] (45% de la pantalla)
               - Desktop: md:h-[60vh] (60% de la pantalla)
            */}
            <div className="w-full h-[45vh] md:h-[60vh] relative z-0">
                <Spline 
                    className="w-full h-full"
                    // Usamos el robot estilo Apple que se centra bien
                    scene="https://prod.spline.design/OSrYM4O-EhnULObM/scene.splinecode" 
                />
                
                {/* Degradado inferior para suavizar el corte con el texto */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B1121] via-[#0B1121]/80 to-transparent pointer-events-none" />
                
                {/* Parche para tapar logo de Spline en la esquina */}
                <div className="absolute bottom-2 right-2 w-32 h-10 bg-[#0B1121] z-20 pointer-events-none" />
            </div>

            {/* 
               2. SECCIÓN TEXTO (ABAJO)
               - flex-1: Ocupa el espacio restante
               - -mt-12: Sube un poco para integrarse con el degradado del robot
            */}
            <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-start text-center px-6 -mt-12 md:-mt-16 pb-10">
                
                {/* Badge Offline */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className="text-[10px] md:text-xs font-mono text-slate-300 tracking-widest uppercase font-bold">
                        Demo Mode
                    </span>
                </div>

                {/* Título Responsivo */}
                <h1 className="text-5xl md:text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">
                    404
                </h1>
                
                <h2 className="text-lg md:text-3xl font-bold text-emerald-400 mb-4 tracking-wide uppercase">
                    Intelligence Not Found
                </h2>

                <p className="text-slate-400 text-sm md:text-lg mb-8 leading-relaxed max-w-md mx-auto">
                    Has llegado al límite de la simulación. <br className="hidden md:block"/>
                    Esta página es solo una demostración visual.
                </p>

                {/* Botones Responsivos */}
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto">
                    {/* Botón Volver */}
                    <button 
                        onClick={() => router.back()}
                        className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl border border-white/10 text-slate-300 font-bold text-sm md:text-base hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        <Icon name="arrow_back" className="text-lg" />
                        Go Back
                    </button>

                    {/* Botón Dashboard */}
                    <Link 
                        href="/dashboard"
                        className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-emerald-500 text-white font-bold text-sm md:text-base hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        Dashboard
                        <Icon name="dashboard" className="text-lg" />
                    </Link>
                </div>

                {/* Footer pequeño */}
                <div className="mt-auto pt-8 opacity-30">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                        LeadGen AI • v1.0.0
                    </p>
                </div>
            </div>
        </div>
    );
}