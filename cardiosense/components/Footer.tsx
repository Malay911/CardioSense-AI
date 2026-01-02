'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Twitter, Linkedin, Github, Mail } from 'lucide-react';

interface FooterProps {
    setCurrentPage: (page: string) => void;
}

const Footer = ({ setCurrentPage }: FooterProps) => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: 'Product',
            links: [
                { label: 'Home', action: () => setCurrentPage('home') },
                { label: 'Risk Assessment', action: () => setCurrentPage('assessment') },
                { label: 'Model Info', action: () => setCurrentPage('modelInfo') },
                { label: 'Disclaimer', action: () => setCurrentPage('disclaimer') },
            ]
        },
        {
            title: 'Resources',
            links: [
                { label: 'Documentation', href: '#' },
                { label: 'Research', href: '#' },
                { label: 'Open Source', href: '#' },
            ]
        },
    ];

    const socialLinks = [
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/malay-panara-3b1733318/', label: 'LinkedIn' },
        { icon: Github, href: 'https://github.com/Malay911', label: 'GitHub' },
        { icon: Mail, href: 'mailto:panaramalay@gmail.com', label: 'Email' },
    ];

    return (
        <footer className="relative w-full bg-zinc-950 border-t border-zinc-800 overflow-hidden mt-20">
            {/* Watermark - positioned behind all content */}
            {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 text-[8rem] md:text-[10rem] font-black text-white/[0.015] whitespace-nowrap pointer-events-none select-none">
                CardioSense AI
            </div> */}

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <motion.div
                            className="flex items-center gap-3 mb-4"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">CardioSense AI</span>
                        </motion.div>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-md mb-6">
                            Advanced AI-powered cardiovascular risk assessment tool.
                            Leveraging machine learning to provide insights into heart health.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500/50 hover:bg-zinc-800 transition-all duration-200"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        {'action' in link && link.action ? (
                                            <button
                                                onClick={link.action}
                                                className="text-zinc-400 hover:text-white transition-colors text-sm"
                                            >
                                                {link.label}
                                            </button>
                                        ) : (
                                            <a
                                                href={'href' in link ? link.href : '#'}
                                                className="text-zinc-400 hover:text-white transition-colors text-sm"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">
                        © {currentYear} CardioSense AI. All rights reserved.
                    </p>
                    <p className="text-zinc-600 text-xs">
                        Not medical advice. For educational purposes only.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
