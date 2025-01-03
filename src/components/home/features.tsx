'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Code, Award, Blocks } from 'lucide-react';
import FeatureCard from './features/feature-card';
import FeatureImage from './features/feature-image';


const features = [
    {
        icon: BookOpen,
        title: "Step-by-Step Learning",
        content: "Learn blockchain development through guided steps, from basics to advanced concepts. Get instant feedback and hints to ensure proper understanding.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop"
    },
    {
        icon: Blocks,
        title: "Structured Curriculum",
        content: "Progress through carefully designed modules and courses. Each module builds upon previous knowledge with assessments to validate your learning.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
    },
    {
        icon: Code,
        title: "Interactive Coding",
        content: "Practice coding in our built-in editor with real-time feedback. Write and test smart contracts directly in your browser.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1200&auto=format&fit=crop"
    },
    {
        icon: Award,
        title: "NFT Certificates",
        content: "Earn verifiable blockchain certificates upon course completion. Showcase your achievements with NFT credentials.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop"
    }
];

export default function Features() {
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-blue-400">
                        Master blockchain development through our comprehensive learning platform
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={feature.title}
                                icon={feature.icon}
                                title={feature.title}
                                content={feature.content}
                                isActive={activeFeature === index}
                                onClick={() => setActiveFeature(index)}
                            />
                        ))}
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="sticky top-24 aspect-[4/3] rounded-2xl border border-gray-800 overflow-hidden">
                            {features.map((feature, index) => (
                                <FeatureImage
                                    key={feature.title}
                                    isActive={activeFeature === index}
                                    image={feature.image}
                                    alt={feature.title}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}