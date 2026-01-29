'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiFigma } from 'react-icons/si';
import { HiArrowDown } from 'react-icons/hi';

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particules d'encre subtiles
        class InkParticle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            life: number;
            maxLife: number;
            size: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.life = 0;
                this.maxLife = 150 + Math.random() * 100;
                this.size = 1 + Math.random() * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life++;
                this.vx *= 0.98;
                this.vy *= 0.98;
            }

            draw(ctx: CanvasRenderingContext2D) {
                const alpha = (1 - this.life / this.maxLife) * 0.1;
                ctx.fillStyle = `rgba(26, 26, 26, ${alpha})`; // ink
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            isDead() {
                return this.life >= this.maxLife;
            }
        }

        const particles: InkParticle[] = [];
        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        canvas.addEventListener('mousemove', handleMouseMove);

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (Math.random() > 0.9) {
                particles.push(new InkParticle(mouseX, mouseY));
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw(ctx);
                if (particles[i].isDead()) {
                    particles.splice(i, 1);
                }
            }

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden pt-20">
            {/* Canvas animation encre */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 text-center space-y-8 max-w-4xl"
            >
                {/* Badge statut */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-600 font-medium">
                        Développeur full-stack en reconversion
                    </span>
                </motion.div>

                {/* Titre principal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-4"
                >
                    <h1 className="font-serif text-6xl md:text-8xl text-ink leading-none">
                        Kim HACH
                    </h1>
                    <p className="font-serif text-2xl md:text-3xl text-ink-light tracking-wide">
                        金恩
                    </p>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-ink-light max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
                >
                    Je suis étudiant en{' '}
                    <span className="text-cyan-500 font-medium">développement full stack</span>.
                    <br />
                    Bienvenue sur mon{' '}
                    <span className="text-cyan-500 font-medium">portfolio</span>.
                </motion.p>

                {/* Liste projets */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-sm text-ink-light/70"
                >
                    Miyazaki-Garden • COS Strasbourg • Applications RH
                </motion.p>

                {/* Tags compétences */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-wrap gap-3 justify-center pt-8"
                >
                    {[
                        { name: 'React', icon: SiReact },
                        { name: 'Next.js', icon: SiNextdotjs },
                        { name: 'Node.js', icon: SiNodedotjs },
                        { name: 'TypeScript', icon: SiTypescript },
                        { name: 'UX Design', icon: SiFigma }
                    ].map((tech, i) => {
                        const Icon = tech.icon;
                        return (
                            <motion.span
                                key={tech.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                                className="group px-4 py-2 bg-ink/5 hover:bg-cyan-50 border border-ink/10 hover:border-cyan-400 rounded-full text-sm text-ink-light hover:text-cyan-600 transition-all duration-300 flex items-center gap-2"
                            >
                                <Icon className="text-base group-hover:scale-110 transition-transform" />
                                {tech.name}
                            </motion.span>
                        );
                    })}
                </motion.div>
            </motion.div>

            {/* Indicateur de scroll animé */}
            <motion.button
                onClick={scrollToProjects}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-light/60 hover:text-cyan-500 transition-colors duration-300 group cursor-pointer"
                aria-label="Défiler vers les projets"
            >
                <span className="text-xs uppercase tracking-wider font-medium">Découvrir</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <HiArrowDown className="w-6 h-6 group-hover:text-cyan-500" />
                </motion.div>
            </motion.button>
        </section>
    );
}