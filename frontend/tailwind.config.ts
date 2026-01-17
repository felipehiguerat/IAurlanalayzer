import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: "class",
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3c83f6",
                "background-light": "#f1f5f8",
                "background-dark": "#0f1729",
                "cyber-blue": "#3B82F6",
                "hot-emerald": "#10B981",
                "warm-amber": "#F59E0B",
                "cyber-emerald": "#10b981",
                "cyber-amber": "#f59e0b",
                "surface-dark": "#1e293b",
                slate: {
                    900: '#0f172a',
                    700: '#1e293b',
                    600: '#475569',
                    500: '#64748b',
                    400: '#94a3b8',
                    300: '#cbd5e1',
                },
            },
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px",
            },
            animation: {
                'gradient': 'gradient 15s ease infinite',
                'pulse-glow': 'pulse 2s infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                pulse: {
                    '0%': { boxShadow: '0 0 0 0 rgba(60, 131, 246, 0.7)' },
                    '70%': { boxShadow: '0 0 0 15px rgba(60, 131, 246, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(60, 131, 246, 0)' },
                },
            },
        },
    },
    plugins: [],
}

export default config
