import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    maxWidth = 'md'
}) => {
    const maxWidthClass = {
        sm: 'max-w-sm',
        md: 'max-w-[480px]',
        lg: 'max-w-lg',
    }[maxWidth];

    return (
        <div className={`glass-panel ${maxWidthClass} w-full ${className} p-8 md:p-12`}>
            {children}
        </div>
    );
};
