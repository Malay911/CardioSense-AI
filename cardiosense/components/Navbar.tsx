'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Activity } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
    openAssessmentPage: () => void;
}

export default function Navbar({ currentPage, setCurrentPage, openAssessmentPage }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`
        fixed top-4 left-4 right-4 z-50
        mx-auto
        flex items-center justify-between
        px-6 py-3
        backdrop-blur-xl
        border border-zinc-800
        rounded-full
        transition-all duration-500 ease-out
        ${isScrolled
                    ? 'max-w-[900px] bg-zinc-900/95 shadow-lg shadow-black/20 border-zinc-700'
                    : 'max-w-[1400px] bg-zinc-900/80'
                }
      `}
        >
            {/* Logo */}
            <motion.div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setCurrentPage('home')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Activity className="w-5 h-5 text-white" />
                </div>
                <span className={`font-bold text-white transition-all duration-300 ${isScrolled ? 'text-base' : 'text-lg'}`}>
                    CardioSense AI
                </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
                <button
                    onClick={() => setCurrentPage('disclaimer')}
                    className={`
            px-4 py-2 text-sm font-medium rounded-lg
            transition-all duration-200
            ${currentPage === 'disclaimer'
                            ? 'text-white bg-zinc-800'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                        }
          `}
                >
                    Disclaimer
                </button>
                <button
                    onClick={() => setCurrentPage('insights')}
                    className={`
            px-4 py-2 text-sm font-medium rounded-lg
            transition-all duration-200
            ${currentPage === 'insights'
                            ? 'text-white bg-zinc-800'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                        }
          `}
                >
                    Data Insights
                </button>
                <button
                    onClick={() => setCurrentPage('modelInfo')}
                    className={`
            px-4 py-2 text-sm font-medium rounded-lg
            transition-all duration-200
            ${currentPage === 'modelInfo'
                            ? 'text-white bg-zinc-800'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                        }
          `}
                >
                    Model Info
                </button>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openAssessmentPage}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                >
                    <Activity className="w-4 h-4" />
                    Check Your Risk
                </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 mt-4 p-4 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => {
                                    setCurrentPage('disclaimer');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-3 text-left text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                Disclaimer
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentPage('insights');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-3 text-left text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                Data Insights
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentPage('modelInfo');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-3 text-left text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                Model Info
                            </button>
                            <button
                                onClick={() => {
                                    openAssessmentPage();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-3 text-center font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg"
                            >
                                Check Your Risk
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    );
}
