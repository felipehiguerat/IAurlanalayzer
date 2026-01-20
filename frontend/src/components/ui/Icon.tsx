'use client';

import React from 'react';
import { IconProps } from '@/lib/types';

// Extendemos las props para asegurarnos de que TypeScript acepte 'style'
// incluso si no está definido en tu archivo types.ts original.
interface ExtendedIconProps extends IconProps {
    style?: React.CSSProperties;
}

export const Icon: React.FC<ExtendedIconProps> = ({
    name,
    className = '',
    filled = false,
    style = {} // Recibimos el estilo externo (por defecto un objeto vacío)
}) => {
    return (
        <span
            className={`material-symbols-outlined ${className}`}
            style={{
                // 1. Mantenemos la configuración obligatoria de la fuente
                fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
                // 2. Agregamos (esparcimos) cualquier estilo extra que envíes (como animationDuration)
                ...style
            }}
            aria-hidden="true"
        >
            {name}
        </span>
    );
};