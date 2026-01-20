'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
// Importamos la herramienta 3D
import Spline from '@splinetool/react-spline';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="relative w-full h-screen bg-[#0B1121] overflow-hidden flex flex-col lg:flex-row items-center justify-center">
            
            {/* 1. Fondo decorativo sutil */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
            </div>

            {/* 2. Sección de TEXTO (Izquierda) */}
            <div className="relative z-10 flex-1 flex flex-col items-center lg:items-start text-center lg:text-left p-8 md:p-16 max-w-2xl">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-mono text-slate-300 tracking-widest uppercase">System Offline</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-6 tracking-tight">
                    404 Error
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-6">
                    Intelligence Not Found
                </h2>

                <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-md">
                    Parece que has llegado al límite de la simulación. <br/>
                    El módulo que buscas es solo una demostración visual ("Mockup") y no existe en este servidor.
                </p>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button 
                        onClick={() => router.back()}
                        className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-3 group backdrop-blur-sm"
                    >
                        <Icon name="arrow_back" className="group-hover:-translate-x-1 transition-transform" />
                        <span>Go Back</span>
                    </button>

                    <Link 
                        href="/dashboard"
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 group"
                    >
                        <span>Dashboard</span>
                        <Icon name="dashboard" className="group-hover:rotate-12 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* 3. Sección 3D (Derecha) - EL ROBOT */}
            <div className="flex-1 w-full h-[50vh] lg:h-full relative lg:absolute lg:right-0 lg:top-0 z-0">
                {/* 
                   NOTA: Esta es una escena pública de Spline de un Robot. 
                   Puedes cambiar la URL 'scene' por cualquier otra de la comunidad de Spline.
                */}
                <Spline 
                    className="w-full h-full"
                    scene="https://prod.spline.design/OSrYM4O-EhnULObM/scene.splinecode" 
                />
                
                {/* Capa para ocultar el logo de Spline si aparece abajo a la derecha */}
                <div className="absolute bottom-4 right-4 w-32 h-10 bg-[#0B1121] z-20 pointer-events-none" />
            </div>

        </div>
    );
}