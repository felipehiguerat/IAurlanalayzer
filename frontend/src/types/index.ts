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
    ml_analysis?: any;
    created_at: string;
}

export interface UserStats {
    user_id: number;
    stats: Record<string, number>;
    summary: string;
}
