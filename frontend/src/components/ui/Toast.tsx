'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Icon } from './Icon';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000); // Auto remove after 5s
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md transition-all animate-in slide-in-from-right-full duration-300
                            ${toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200' : ''}
                            ${toast.type === 'error' ? 'bg-red-950/90 border-red-500/30 text-red-200' : ''}
                            ${toast.type === 'warning' ? 'bg-amber-950/90 border-amber-500/30 text-amber-200' : ''}
                            ${toast.type === 'info' ? 'bg-slate-900/90 border-slate-700/50 text-slate-200' : ''}
                        `}
                    >
                        <Icon
                            name={
                                toast.type === 'success' ? 'check_circle' :
                                    toast.type === 'error' ? 'error' :
                                        toast.type === 'warning' ? 'warning' : 'info'
                            }
                            className={`text-[20px] ${toast.type === 'success' ? 'text-emerald-400' :
                                toast.type === 'error' ? 'text-red-400' :
                                    toast.type === 'warning' ? 'text-amber-400' : 'text-blue-400'
                                }`}
                        />
                        <span className="text-sm font-medium">{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-4 hover:bg-white/10 rounded-full p-1 transition-colors"
                        >
                            <Icon name="close" className="text-[16px] opacity-60" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
