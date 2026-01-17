'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import Background from '@/components/ui/Background';
import Logo from '@/components/ui/Logo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Icon } from '@/components/ui/Icon';
import { useLoginForm } from '@/lib/hooks/useLoginForm';
import Link from 'next/link';
import { PublicGuard } from '@/components/auth/AuthGuard';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    formData,
    isLoading,
    error,
    handleSubmit,
    handleChange,
    togglePassword,
    showPassword
  } = useLoginForm();

  return (
    <PublicGuard>
      <main className="min-h-screen flex flex-col pt-24 bg-background-light dark:bg-background-dark transition-colors duration-500">
        <Background />
        <Header />

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-[450px]">
            <div className="bg-gradient-animate absolute inset-0 -z-10 opacity-20" />
            <Card className="flex flex-col gap-8 relative overflow-hidden">
              <div className="text-center flex flex-col gap-2 relative z-10">
                <Logo className="justify-center mb-4" />
                <h1 className="text-3xl font-bold text-slate-900 font-display">
                  {isLogin ? '¡Bienvenido de nuevo!' : 'Crea tu cuenta'}
                </h1>
                <p className="text-slate-500 text-sm">
                  {isLogin
                    ? 'Ingresa tus credenciales para acceder a tu panel inteligente.'
                    : 'Empieza a clasificar tus leads con IA hoy mismo.'}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 relative z-10"
              >
                <div className="flex flex-col gap-4">
                  <InputField
                    label="Correo Electrónico"
                    placeholder="tu@email.com"
                    type="email"
                    icon="mail"
                    value={formData.email}
                    onChange={(val) => handleChange('email', val)}
                  />
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
                      className="absolute right-4 top-[38px] text-slate-400 hover:text-primary transition-colors"
                    >
                      <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
                    </button>
                  </div>
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
                  iconRight={isLogin ? "login" : "person_add"}
                >
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </Button>
              </form>

              <div className="text-center relative z-10">
                <p className="text-slate-500 text-sm">
                  {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                  <Link
                    href={isLogin ? "/register" : "/login"}
                    onClick={() => !isLogin && setIsLogin(true)}
                    className="ml-2 text-primary hover:text-blue-700 font-medium transition-colors"
                  >
                    {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
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
