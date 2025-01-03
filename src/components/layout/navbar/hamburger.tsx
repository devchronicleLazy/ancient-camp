'use client'
import { motion } from "framer-motion";

interface HamburgerProps {
    isOpen: boolean;
    onClick: () => void;
    direction?: "left" | "right";
}

export default function Hamburger({ isOpen, onClick, direction = "right" }: HamburgerProps) {
    return (
        <motion.div
            className="h-5 w-8 flex flex-col text-black  justify-between cursor-pointer hover:opacity-85 relative"
            onClick={onClick}
        >
            {Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                    key={index}
                    className="h-1 bg-white"
                    initial={false}
                    animate={
                        index === 1
                            ? {
                                x: isOpen ? (direction === "left" ? "-100%" : "100%") : 0,
                                opacity: isOpen ? 0 : 1,
                            }
                            : index === 0
                                ? {
                                    y: isOpen ? "150%" : 0,
                                    rotate: isOpen ? 45 : 0,
                                }
                                : {
                                    y: isOpen ? "-250%" : 0,
                                    rotate: isOpen ? -45 : 0,
                                }
                    }
                    transition={{ duration: 0.3 }}
                    style={{ width: "100%" }}
                />
            ))}
        </motion.div>
    );
}
