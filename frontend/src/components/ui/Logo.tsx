import React from 'react';
import { Icon } from './Icon';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${className}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
                <Icon name="rocket_launch" className="text-white" filled />
            </div>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                LeadGravity
            </span>
        </div>
    );
};

export default Logo;
