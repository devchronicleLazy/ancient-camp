// src/components/navbar/AncientCampNavbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    GraduationCap,
    Menu,
    X,
    BookOpen,
    Users,
    Award,
    Code,
    ChevronDown
} from 'lucide-react';
import CustomConnectButton from './navbar/connect-button';


export function AncientCampNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationItems = [
        {
            label: 'Learn',
            icon: BookOpen,
            href: '/learn',
            dropdownItems: [
                { label: 'Courses', href: '/courses' },
                { label: 'Tutorials', href: '/tutorials' },
                { label: 'Workshops', href: '/workshops' },
            ]
        },
        {
            label: 'Community',
            icon: Users,
            href: '/community',
        },
        {
            label: 'Certificates',
            icon: Award,
            href: '/certificates',
        },
        {
            label: 'Docs',
            icon: Code,
            href: '/docs',
        }
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 group"
                    >
                        <div className={`p-2 rounded-xl transition-colors ${isScrolled
                            ? 'bg-blue-50 group-hover:bg-blue-100'
                            : 'bg-white/10'
                            }`}>
                            <GraduationCap className={`h-8 w-8 ${isScrolled ? 'text-blue-600' : 'text-white'
                                }`} />
                        </div>
                        <span className={`text-xl font-bold transition-colors ${isScrolled
                            ? 'bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
                            : 'text-white'
                            }`}>
                            AncientCamp
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navigationItems.map((item) => (
                            <div key={item.label} className="relative group">
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isScrolled
                                        ? 'text-gray-600 hover:text-blue-600'
                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4 mr-2" />
                                    <span>{item.label}</span>
                                    {item.dropdownItems && (
                                        <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
                                    )}
                                </Link>

                                {item.dropdownItems && (
                                    <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="py-2 bg-white rounded-xl shadow-xl border border-gray-100">
                                            {item.dropdownItems.map((dropdownItem) => (
                                                <Link
                                                    key={dropdownItem.label}
                                                    href={dropdownItem.href}
                                                    className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                >
                                                    {dropdownItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <CustomConnectButton />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled
                            ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            : 'text-white hover:bg-white/10'
                            }`}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
                }`}>
                <div className="bg-white border-t shadow-xl px-4 py-6 space-y-4">
                    {navigationItems.map((item) => (
                        <div key={item.label}>
                            <Link
                                href={item.href}
                                className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                            {item.dropdownItems && (
                                <div className="ml-12 mt-2 space-y-2">
                                    {item.dropdownItems.map((dropdownItem) => (
                                        <Link
                                            key={dropdownItem.label}
                                            href={dropdownItem.href}
                                            className="block px-4 py-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {dropdownItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="px-4 pt-4">
                        <CustomConnectButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AncientCampNavbar;
