'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

interface GradualSpacingProps {
    text?: string;
    highlightFrom?: number;
    className?: string;
    maxWidth?: string;
    fontSize?: {
        base?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
    };
    highlightVariant?: 'default' | 'soft' | 'pastel';
}

export const GradualSpacing: React.FC<GradualSpacingProps> = ({
    text = '',
    highlightFrom = 0,
    className = '',
    maxWidth = 'max-w-7xl',
    fontSize = {
        base: 'text-2xl',
        sm: 'sm:text-3xl',
        md: 'md:text-4xl',
        lg: 'lg:text-5xl',
        xl: 'xl:text-7xl',
    },
    highlightVariant = 'soft'
}) => {
    const gradual = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    // Highlight color variants
    const highlightColors = {
        default: 'from-sky-300 to-indigo-300',
        soft: 'from-blue-300 to-purple-300',
        pastel: 'from-sky-300 to-indigo-300'
    };

    const words = text.split(/\s+/);
    let charCount = 0;

    return (
        <div className={clsx('flex flex-wrap justify-center mx-auto', maxWidth, className)}>
            <AnimatePresence>
                <div className="flex flex-wrap justify-center gap-y-2 px-4">
                    {words.map((word, wordIndex) => (
                        <div key={`word-${wordIndex}`} className="flex mx-3">
                            {word.split('').map((char, charIndex) => {
                                const globalIndex = charCount++;
                                return (
                                    <motion.span
                                        key={`${wordIndex}-${charIndex}`}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={gradual}
                                        transition={{
                                            duration: 0.6,
                                            delay: globalIndex * 0.08,
                                            ease: "easeOut"
                                        }}
                                        className={clsx(
                                            'font-display font-bold drop-shadow-sm',
                                            fontSize.base,
                                            fontSize.sm,
                                            fontSize.md,
                                            fontSize.lg,
                                            fontSize.xl,
                                            "tracking-[-0.001em]",
                                            'mx-[0.03em]',
                                            globalIndex >= highlightFrom
                                                ? `bg-gradient-to-r ${highlightColors[highlightVariant]} text-transparent bg-clip-text`
                                                : 'text-white'
                                        )}
                                    >
                                        {char}
                                    </motion.span>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </AnimatePresence>
        </div>
    );
};