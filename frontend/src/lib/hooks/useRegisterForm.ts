import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '../api';

interface RegisterFormState {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface UseRegisterFormReturn {
    formData: RegisterFormState;
    isLoading: boolean;
    error: string | null;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleChange: <K extends keyof RegisterFormState>(field: K, value: RegisterFormState[K]) => void;
    togglePassword: () => void;
    showPassword: boolean;
}

export const useRegisterForm = (): UseRegisterFormReturn => {
    const [formData, setFormData] = useState<RegisterFormState>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // 1. Register
            await api.post('/auth/register', {
                email: formData.email,
                password: formData.password,
                full_name: formData.fullName
            });

            // 2. Auto-login after register
            const loginRes = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });

            const { access_token } = loginRes.data;
            localStorage.setItem('token', access_token);

            router.push('/dashboard');
        } catch (err: any) {
            console.error('Register error:', err);
            setError(err.response?.data?.detail || 'Error al crear la cuenta. Intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    }, [formData, router]);

    const handleChange = useCallback(<K extends keyof RegisterFormState>(
        field: K,
        value: RegisterFormState[K]
    ) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const togglePassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    return {
        formData,
        isLoading,
        error,
        handleSubmit,
        handleChange,
        togglePassword,
        showPassword,
    };
};
