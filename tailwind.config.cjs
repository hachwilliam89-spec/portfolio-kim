// tailwind.config.cjs - adapté pour Tailwind v4
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                washi: '#F8F6F2',
                ink: {
                    DEFAULT: '#0F1720',
                    70: 'rgba(15,23,32,0.7)',
                },
                vermillon: {
                    DEFAULT: '#C9412B',
                    dark: '#A43621',
                },
                gold: {
                    DEFAULT: '#C9A34A',
                    dark: '#A67C2A',
                },
            },
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
            },
            boxShadow: {
                'vermillon-soft': '0 10px 30px rgba(201,163,74,0.08)',
            },
            borderRadius: {
                lg2: '1rem',
            },
        },
    },
    variants: {
        extend: {
            borderColor: ['focus-visible', 'hover'],
            backgroundColor: ['active'],
            ringWidth: ['focus-visible'],
        },
    },
    // safelist utile si tu génères des classes dynamiquement (ex: `bg-${color}`)
    safelist: [
        // example: 'bg-washi', 'text-ink', 'bg-vermillon', add as needed
    ],
    plugins: [],
};