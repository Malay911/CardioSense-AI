'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Cpu, FileCheck, Lock } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            icon: ClipboardList,
            title: 'Clinical Data Input',
            points: [
                'Standard exam-based clinical parameters',
                'Vital signs and biometric measurements',
                'Patient-reported lifestyle factors',
                'Missing values handled deterministically',
            ],
        },
        {
            number: 2,
            icon: Cpu,
            title: 'AI Model Analysis',
            points: [
                'Gender-specific statistical features',
                'BMI automatically calculated',
                'Ensemble learning with advanced tuning',
                'Cross-validated hyperparameter search',
            ],
        },
        {
            number: 3,
            icon: FileCheck,
            title: 'Risk Assessment Output',
            points: [
                'Probability-based cardiovascular score',
                'Model confidence with actionable insights',
                'Easy-to-interpret classification',
                'Key contributor factors highlighted',
            ],
        },
    ];

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-zinc-900">
            <div className="max-w-7xl mx-auto">
                {/* Animated ECG Line */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-8"
                >
                    <svg width="400" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="howItWorksGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                                <stop offset="30%" stopColor="#06B6D4" stopOpacity="1" />
                                <stop offset="70%" stopColor="#06B6D4" stopOpacity="1" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                        {/* Background line */}
                        <path
                            d="M0 30 L120 30 L140 30 L155 10 L170 50 L185 30 L210 30 L400 30"
                            stroke="rgba(6, 182, 212, 0.15)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />
                        {/* Animated pulse line */}
                        <path
                            className="ecg-pulse-line"
                            d="M0 30 L120 30 L140 30 L155 10 L170 50 L185 30 L210 30 L400 30"
                            stroke="url(#howItWorksGradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        {/* Glowing dot */}
                        <circle cx="185" cy="30" r="4" fill="#06B6D4" style={{ filter: 'drop-shadow(0 0 6px #06B6D4)' }}>
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">How it Works</h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        A precise three-step pipeline for cardiovascular risk assessment
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-800/80 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/20"
                        >
                            {/* Step Number Badge */}
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                                <span className="text-2xl font-bold text-white">{step.number}</span>
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>

                            <ul className="space-y-3">
                                {step.points.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Security Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-full">
                        <Lock className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
                            Secure • Encrypted • Research-Backed • Machine Learning
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
