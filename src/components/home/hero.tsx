import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GradualSpacing } from '../eldoraui/gradualspacing';
import Background from '../eldoraui/novatrixbg';


export default function Hero() {
    return (
        <div className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden " data-section="hero">
            <Background />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">


                <GradualSpacing
                    text='Unlock the Power of Blockchain, Step by Step'
                    highlightFrom={26}
                    className="text-white"
                />
                <p className="text-xs md:text-[18px] leading-9 text-blue-100 my-6 max-w-3xl mx-auto">
                    Embark on a journey to become a proficient blockchain developer through hands-on learning and real-world projects.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link
                        href="/learn/1/l1"
                        className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-violet-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
                    >
                        Start Your Journey
                        <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/courses"
                        className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-200 border border-white/20"
                    >
                        Explore Curriculum
                    </Link>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
                    {[
                        { label: 'Interactive Learning', description: 'Learn by doing with hands-on projects' },
                        { label: 'Expert Guidance', description: 'Industry-leading curriculum and mentorship' },
                        { label: 'Real-World Skills', description: 'Build production-ready blockchain applications' }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="text-lg font-semibold text-white mb-2">{feature.label}</div>
                            <div className="text-sm text-blue-200">{feature.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}