import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    content: string;
    isActive: boolean;
    onClick: () => void;
}

export default function FeatureCard({ icon: Icon, title, content, isActive, onClick }: FeatureCardProps) {
    return (
        <motion.div
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${isActive
                ? 'bg-blue-600 border border-blue-500'
                : 'bg-white hover:bg-gray-200'
                }`}
            onClick={onClick}
            animate={{
                scale: isActive ? 1 : 0.98,
                opacity: isActive ? 1 : 0.8
            }}
        >
            <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${isActive
                    ? 'bg-blue-500'
                    : 'bg-gray-700'
                    }`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-black">
                        {title}
                    </h3>
                    <p className="text-text-black">
                        {content}
                    </p>
                </div>
            </div>
            {isActive && (
                <motion.div
                    className="h-1 bg-blue-800 mt-4 rounded-full overflow-hidden"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                >
                    <div className="h-full bg-blue-400 rounded-full" />
                </motion.div>
            )}
        </motion.div>
    );
}