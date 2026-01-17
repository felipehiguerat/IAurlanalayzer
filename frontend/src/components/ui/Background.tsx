import React from 'react';

const Background: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Dynamic Blobs */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]"
                style={{ animation: 'pulse-slow 8s infinite ease-in-out' }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-hot-emerald/5 blur-[120px]"
                style={{ animation: 'pulse-slow 8s infinite ease-in-out', animationDelay: '4s' }}
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }}
            />
        </div>
    );
};

export default Background;
