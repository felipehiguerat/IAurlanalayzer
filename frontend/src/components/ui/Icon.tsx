'use client';

import React from 'react';
import { IconProps } from '@/lib/types';

export const Icon: React.FC<IconProps> = ({
    name,
    className = '',
    filled = false
}) => {
    return (
        <span
            className={`material-symbols-outlined ${className}`}
            style={{
                fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`
            }}
            aria-hidden="true"
        >
            {name}
        </span>
    );
};
