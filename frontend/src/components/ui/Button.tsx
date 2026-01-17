'use client';

import { Icon } from './Icon';
import { ButtonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    iconRight,
    children,
    className,
    disabled,
    ...props
}) => {
    const baseStyles = 'flex items-center justify-center gap-3 rounded-lg transition-all font-medium active:scale-95';

    const variants = {
        primary: 'bg-primary hover:bg-primary/90 text-white shadow-lg pulse-glow',
        secondary: 'bg-white/5 hover:bg-white/10 border border-white/10 text-white',
        ghost: 'bg-transparent hover:bg-white/5 text-slate-300',
    };

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-5 text-sm',
        lg: 'h-14 px-6 text-lg font-bold rounded-xl',
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                isLoading && 'opacity-70 cursor-not-allowed',
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading...
                </span>
            ) : (
                <>
                    <span>{children}</span>
                    {iconRight && (
                        <Icon
                            name={iconRight}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    )}
                </>
            )}
        </button>
    );
};
