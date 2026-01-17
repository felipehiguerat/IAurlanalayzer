'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import Background from '@/components/ui/Background';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Icon } from '@/components/ui/Icon';
import { useRegisterForm } from '@/lib/hooks/useRegisterForm';
import { PublicGuard } from '@/components/auth/AuthGuard';

export default function RegisterPage() {
    const {
        formData,
        isLoading,
        error,
        handleSubmit,
        handleChange,
        togglePassword,
        showPassword
    } = useRegisterForm();

    return (
        <PublicGuard>
            <main className="min-h-screen flex flex-col pt-20 bg-background-light dark:bg-background-dark transition-colors duration-500">
                <Background />
                <Header />

                <div className="flex-1 flex items-center justify-center p-6 relative z-10">
                    <div className="w-full max-w-[520px]">
                        <div className="bg-gradient-animate absolute inset-0 -z-10 opacity-10" />
                        <Card className="flex flex-col gap-6 overflow-hidden" maxWidth="lg">
                            <div className="text-center flex flex-col gap-2">
                                <h1 className="text-3xl font-bold text-slate-900 font-display">
                                    Crea tu cuenta
                                </h1>
                                <p className="text-white text-sm">
                                    Empieza a extraer y clasificar leads con IA en segundos.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-5"
                            >
                                <div className="label-white">
                                    <InputField
                                        label="Nombre Completo"
                                        placeholder="Juan Pérez"
                                        type="text"
                                        icon="person"
                                        value={formData.fullName}
                                        onChange={(val) => handleChange('fullName', val)}
                                    />
                                </div>

                                <InputField
                                    label="Correo Electrónico"
                                    placeholder="tu@email.com"
                                    type="email"
                                    icon="mail"
                                    value={formData.email}
                                    onChange={(val) => handleChange('email', val)}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <InputField
                                            label="Contraseña"
                                            placeholder="••••••••"
                                            type={showPassword ? 'text' : 'password'}
                                            icon="lock"
                                            value={formData.password}
                                            onChange={(val) => handleChange('password', val)}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePassword}
                                            className="absolute right-4 top-[42px] text-slate-400 hover:text-primary transition-colors"
                                        >
                                            <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[18px]" />
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <InputField
                                            label="Confirmar"
                                            placeholder="••••••••"
                                            type={showPassword ? 'text' : 'password'}
                                            icon="enhanced_encryption"
                                            value={formData.confirmPassword}
                                            onChange={(val) => handleChange('confirmPassword', val)}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePassword}
                                            className="absolute right-4 top-[42px] text-slate-400 hover:text-primary transition-colors"
                                        >
                                            <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[18px]" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 px-1">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mt-1 size-4 rounded border-slate-300 text-primary focus:ring-primary"
                                        required
                                    />
                                    <label htmlFor="terms" className="text-xs text-slate-500 leading-tight">
                                        Acepto los <Link href="/terms" className="text-primary hover:underline">Términos de Servicio</Link> y la <Link href="/privacy" className="text-primary hover:underline">Política de Privacidad</Link>.
                                    </label>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl flex items-center gap-2 animate-pulse">
                                        <Icon name="error" className="text-[16px]" filled />
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    isLoading={isLoading}
                                    iconRight="person_add"
                                    className="mt-2"
                                >
                                    Registrarme ahora
                                </Button>
                            </form>

                            <div className="text-center border-t border-slate-100 pt-6">
                                <p className="text-slate-500 text-sm">
                                    ¿Ya tienes una cuenta?
                                    <Link
                                        href="/login"
                                        className="ml-2 text-primary hover:text-blue-700 font-semibold transition-colors"
                                    >
                                        Inicia sesión aquí
                                    </Link>
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

                <Footer />
            </main>
        </PublicGuard>
    );
}
