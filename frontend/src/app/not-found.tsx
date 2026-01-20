'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon'; // Asegúrate de importar tu componente Icon
import Link from 'next/link';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0B1121] overflow-hidden px-4">
            
            {/* 1. Fondo Animado (Blobs de luz) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            {/* 2. Tarjeta Central */}
            <div className="relative z-10 glass-card p-10 md:p-14 rounded-3xl border border-white/10 flex flex-col items-center text-center max-w-lg shadow-2xl backdrop-blur-xl">
                
                {/* Icono Animado */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-ping opacity-75" />
                    <div className="relative bg-white/5 border border-white/10 p-6 rounded-2xl shadow-inner">
                        <Icon 
                            name="smart_toy" 
                            className="text-6xl text-emerald-400 animate-bounce" 
                            style={{ animationDuration: '3s' }}
                        />
                    </div>
                    
                    {/* Pequeños iconos flotantes decorativos */}
                    <Icon name="code" className="absolute -top-4 -right-4 text-slate-600 text-xl animate-spin-slow" />
                    <Icon name="lock" className="absolute -bottom-2 -left-4 text-slate-600 text-xl" />
                </div>

                {/* Título y Texto */}
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4 tracking-tight">
                    Demo Mode Only
                </h1>
                
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    ¡Ups! Esta página es solo una simulación. <br/>
                    En un entorno de producción real, aquí verías documentación legal o configuraciones avanzadas.
                </p>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button 
                        onClick={() => router.back()}
                        className="flex-1 py-3 px-6 rounded-xl border border-white/10 text-slate-300 font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2 group"
                    >
                        <Icon name="arrow_back" className="group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>

                    <Link 
                        href="/dashboard"
                        className="flex-1 py-3 px-6 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 group"
                    >
                        Dashboard
                        <Icon name="dashboard" className="group-hover:rotate-12 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Footer pequeño */}
            <p className="absolute bottom-8 text-slate-600 text-xs font-mono uppercase tracking-widest opacity-50">
                LeadGen AI Portfolio Project
            </p>
        </div>
    );
}