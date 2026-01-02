'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Zap, BarChart3, CheckCircle } from 'lucide-react';

interface HeroProps {
    openAssessmentPage: () => void;
    setCurrentPage: (page: string) => void;
}

export default function Hero({ openAssessmentPage, setCurrentPage }: HeroProps) {
    const features = [
        {
            icon: Brain,
            title: 'Machine Learning Powered',
            description: 'Advanced algorithms trained on extensive medical datasets.',
            gradient: 'from-blue-500 to-blue-600',
        },
        {
            icon: Zap,
            title: 'Real-Time Analysis',
            description: 'Get instant risk assessment within seconds.',
            gradient: 'from-orange-500 to-orange-600',
        },
        {
            icon: CheckCircle,
            title: 'Comprehensive Metrics',
            description: 'Analyzes blood pressure, cholesterol, and lifestyle.',
            gradient: 'from-green-500 to-green-600',
        },
        {
            icon: BarChart3,
            title: 'Detailed Insights',
            description: 'Personalized risk indicators and recommendations.',
            gradient: 'from-purple-500 to-purple-600',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="grid lg:grid-cols-2 gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left Content */}
                    <div>
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6"
                        >
                            <Shield className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-400">AI-Powered Health Screening</span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                        >
                            Advanced Heart Health
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400">
                                Prediction System
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg"
                        >
                            Leverage machine learning to assess your cardiovascular disease risk based on comprehensive health metrics and lifestyle factors.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={openAssessmentPage}
                                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                            >
                                <Shield className="w-5 h-5" />
                                Get Your Assessment
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentPage('modelInfo')}
                                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-zinc-900 border border-zinc-800 text-white rounded-lg hover:bg-zinc-800 transition-all duration-300"
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right - Feature Cards Grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        variants={containerVariants}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-800/80 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/20"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
