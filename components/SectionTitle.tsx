'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
    return (
        <div className={`relative w-full text-center mb-12 ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative inline-block px-8 py-3"
            >
                {/* Encadré coins chinois avec pulsation */}
                <motion.svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.g
                        stroke="#c73e1d"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="square"
                        animate={{
                            opacity: [0.5, 0.9, 0.5],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Coin haut gauche */}
                        <path d="M 2 18 L 2 2 L 18 2" />
                        <path d="M 6 12 L 6 6 L 12 6" />

                        {/* Coin haut droit */}
                        <path d="M 182 2 L 198 2 L 198 18" />
                        <path d="M 188 6 L 194 6 L 194 12" />

                        {/* Coin bas gauche */}
                        <path d="M 2 42 L 2 58 L 18 58" />
                        <path d="M 6 48 L 6 54 L 12 54" />

                        {/* Coin bas droit */}
                        <path d="M 182 58 L 198 58 L 198 42" />
                        <path d="M 188 54 L 194 54 L 194 48" />
                    </motion.g>
                </motion.svg>

                <h2 className="font-display text-4xl md:text-5xl font-bold text-ink relative z-10">
                    {children}
                </h2>
            </motion.div>
        </div>
    );
}