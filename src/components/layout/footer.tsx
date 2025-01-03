// src/components/footer/Footer.tsx
import React from 'react';
import Link from 'next/link';
import {
    GraduationCap,
    Github,
    Twitter,
    Linkedin,

    Mail,
    BookOpen,
    Code,
    Award,
    ArrowRight
} from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const mainLinks = [
        { label: 'Courses', href: '/courses', icon: BookOpen },

        { label: 'Certificates', href: '/certificates', icon: Award },
        { label: 'Developer Docs', href: '/docs', icon: Code },
    ];

    const socialLinks = [
        { label: 'GitHub', href: 'https://github.com/Ancientcamp', icon: Github },
        { label: 'Twitter', href: 'https://twitter.com/Ancientcamp', icon: Twitter },
        { label: 'LinkedIn', href: 'https://linkedin.com/company/Ancientcamp', icon: Linkedin },

    ];

    return (
        <footer className="bg-white border-t border-gray-100">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                AncientCamp
                            </span>
                        </div>
                        <p className="text-gray-600">
                            Learn blockchain development through interactive courses and earn verifiable certificates.
                        </p>

                        {/* Newsletter */}
                        <div className="pt-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {mainLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            <Icon className="w-4 h-4" />
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <a
                                href="mailto:hello@Ancientcamp.dev"
                                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                hello@Ancientcamp.dev
                            </a>
                            <div className="flex items-center gap-4 pt-2">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                            aria-label={link.label}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} AncientCamp. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <Link href="/terms" className="hover:text-gray-900 transition-colors">
                                Terms
                            </Link>
                            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                                Privacy
                            </Link>
                            <Link href="/cookies" className="hover:text-gray-900 transition-colors">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
