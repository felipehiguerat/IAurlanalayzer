export interface User {
    id: number;
    email: string;
    is_active: boolean;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface Lead {
    _id: string;
    url: string;
    title?: string;
    description?: string;
    owner_id: number;
    status: string;
    ml_score: number;
    ml_analysis?: Record<string, unknown>;
    created_at: string;
}

export interface UserStats {
    user_id: number;
    stats: Record<string, number>;
    summary: string;
}

export interface IconProps {
    name: string;
    className?: string;
    filled?: boolean;
}

export interface InputFieldProps {
    label: string;
    type: string;
    placeholder?: string;
    icon: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    iconRight?: string;
}
