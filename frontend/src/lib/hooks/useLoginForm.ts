import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '../api';

interface LoginFormState {
    email: string;
    password: string;
}

interface UseLoginFormReturn {
    formData: LoginFormState;
    isLoading: boolean;
    error: string | null;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleChange: <K extends keyof LoginFormState>(field: K, value: LoginFormState[K]) => void;
    togglePassword: () => void;
    showPassword: boolean;
}

export const useLoginForm = (): UseLoginFormReturn => {
    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post('/api/v1/auth/login', {
                email: formData.email,
                password: formData.password
            });

            const { access_token } = response.data;
            localStorage.setItem('token', access_token);

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.detail || 'Correo o contraseña incorrectos');
        } finally {
            setIsLoading(false);
        }
    }, [formData, router]);

    const handleChange = useCallback(<K extends keyof LoginFormState>(
        field: K,
        value: LoginFormState[K]
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

