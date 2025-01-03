import { motion } from 'framer-motion';
import Image from 'next/image';

interface FeatureImageProps {
    isActive: boolean;
    image: string;
    alt: string;
}

export default function FeatureImage({ isActive, image, alt }: FeatureImageProps) {
    return (
        <motion.div
            className={`absolute inset-0 rounded-2xl overflow-hidden ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{
                scale: isActive ? 1 : 1.1,
                opacity: isActive ? 1 : 0
            }}
            transition={{ duration: 0.5 }}
        >
            <Image
                src={image}
                alt={alt}
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />
        </motion.div>
    );
}