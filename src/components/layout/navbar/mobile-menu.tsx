// src/components/layout/navbar/MobileMenu.tsx
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";


interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className=" text-black md:hidden border-t border-primary-500/10"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-background-dark/95 backdrop-blur-lg">
                        {['Courses', 'Learn', 'Community'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                onClick={onClose}
                                className="block px-3 py-2 rounded-md text-primary-100 hover:text-white hover:bg-primary-500/10 transition-colors duration-200"
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="px-3 py-2">
                            {/* <WalletConnect chainName="Ancient" /> */}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
