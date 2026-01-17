'use client';

import { Icon } from './Icon';
import { InputFieldProps } from '@/lib/types';

export const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    placeholder,
    icon,
    error,
    value,
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-slate-300 text-sm font-medium ml-1">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                    <Icon name={icon} className="text-[22px]" />
                </div>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full h-14 pl-12 pr-4 bg-slate-900/50 border rounded-xl 
                     text-white placeholder:text-slate-600
                     focus:outline-none focus:ring-2 focus:ring-primary/50 
                     focus:border-primary transition-all
                     ${error ? 'border-red-500' : 'border-slate-700'}`}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${label}-error` : undefined}
                />
                {error && (
                    <p id={`${label}-error`} className="text-red-500 text-xs mt-1">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};
