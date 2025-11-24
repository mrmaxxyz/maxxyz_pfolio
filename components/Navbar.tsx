'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface NavbarProps {
    siteTitle: string;
    navigation: Array<{ label: string; link: string }>;
}

export function Navbar({ siteTitle, navigation }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Extract short brand name (first word or part before "|")
    const shortName = siteTitle.split('|')[0].trim().split(' ')[0];

    // Close menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <>
            {/* Desktop & Mobile Navbar */}
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-background/80 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-lg">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-bold text-lg tracking-tight hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        {shortName}
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navigation.map((item, i) => (
                            <Link
                                key={i}
                                href={item.link}
                                className="hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side: Theme Toggle + Mobile Menu Button */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-1 hover:text-primary transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="flex flex-col items-center justify-center h-full gap-8 text-xl font-medium">
                        {navigation.map((item, i) => (
                            <Link
                                key={i}
                                href={item.link}
                                className="hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
