"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Activity,
    BarChart3,
    Database,
    Settings2,
    Cpu,
    ShieldCheck,
    Calendar,
    ListFilter
} from 'lucide-react';
import Footer from './Footer';

interface ModelInfoPageProps {
    setCurrentPage: (page: string) => void;
}

export default function ModelInfoPage({ setCurrentPage }: ModelInfoPageProps) {
    const stats = {
        model: [
            { label: 'Algorithm', value: 'Random Forest (Tuned)', icon: Cpu },
            { label: 'Library', value: 'Scikit-Learn', icon: Database },
            { label: 'Trained At', value: 'Project Final', icon: Calendar },
            { label: 'Features', value: '13 Inputs', icon: ListFilter },
        ],
        hyperparameters: [
            { name: 'n_estimators', value: '231' },
            { name: 'max_depth', value: '40' },
            { name: 'min_samples_split', value: '3' },
            { name: 'min_samples_leaf', value: '7' },
            { name: 'max_features', value: 'sqrt' },
        ],
        performance: [
            { label: 'Accuracy', value: 73.30, color: 'bg-blue-500' },
            { label: 'F1 Score', value: 71.88, color: 'bg-indigo-500' },
            { label: 'ROC AUC', value: 80.00, color: 'bg-emerald-500' },
        ],
        featureImportance: [
            { name: 'Systolic BP', weight: 30.67 },
            { name: 'Diastolic BP', weight: 14.46 },
            { name: 'Age', weight: 12.56 },
            { name: 'BMI', weight: 9.88 },
            { name: 'Body Weight', weight: 7.12 },
            { name: 'Cholesterol', weight: 6.48 },
        ],
        results: {
            metrics: [
                { label: 'Accuracy', value: '73.30%' },
                { label: 'Precision', value: '75.14%' },
                { label: 'Recall', value: '68.90%' },
                { label: 'F1 Score', value: '71.88%' },
            ],
            confusionMatrix: [
                { label: 'True Negative', count: '5,380', percent: '39.17%', type: 'bg-zinc-800' },
                { label: 'False Positive', count: '1,551', percent: '11.29%', type: 'bg-red-500/10 border-red-500/20' },
                { label: 'False Negative', count: '2,116', percent: '15.41%', type: 'bg-orange-500/10 border-orange-500/20' },
                { label: 'True Positive', count: '4,688', percent: '34.13%', type: 'bg-blue-500' },
            ]
        }
    };

    return (
        <div className="min-h-screen pt-28 bg-[#0a0a0a] text-white">
            <div className="max-w-6xl mx-auto px-6 pb-24">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={() => setCurrentPage('home')}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                        Model Architecture & Performance
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Deep dive into our Tuned Random Forest Classifier, optimized for high-precision
                        cardiovascular risk identification using large-scale health data.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column - Model Info */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Model Specs */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-blue-500" />
                                Model Identity
                            </h3>
                            <div className="space-y-4">
                                {stats.model.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-4 h-4 text-zinc-400" />
                                            <span className="text-sm text-zinc-400">{item.label}</span>
                                        </div>
                                        <span className="text-sm font-semibold">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hyperparameters */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Settings2 className="w-5 h-5 text-indigo-500" />
                                Hyperparameters
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {stats.hyperparameters.map((param, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
                                        <span className="text-sm font-mono text-zinc-400">{param.name}</span>
                                        <span className="text-sm font-semibold text-indigo-400">{param.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Performance & Metrics */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Metrics Progress */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-emerald-500" />
                                Performance Benchmarks
                            </h3>
                            <div className="space-y-8">
                                {stats.performance.map((metric, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-zinc-400">{metric.label}</span>
                                            <span className="text-sm font-bold">{metric.value.toFixed(2)}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${metric.value}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                                                className={`h-full ${metric.color}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Feature Importance */}
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold mb-6">Top Feature Importance</h3>
                                <div className="space-y-4">
                                    {stats.featureImportance.map((feature, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between text-xs mb-1 text-zinc-400">
                                                <span>{feature.name}</span>
                                                <span>{feature.weight}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(feature.weight / 35) * 100}%` }}
                                                    transition={{ duration: 0.8, delay: 0.7 + (idx * 0.05) }}
                                                    className="h-full bg-blue-500/50"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Classification Results */}
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold mb-6 text-zinc-300">Classification Results</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {stats.results.metrics.map((metric, idx) => (
                                        <div key={idx} className="p-3 rounded-xl bg-zinc-800/20 border border-zinc-800">
                                            <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{metric.label}</div>
                                            <div className="text-xl font-bold text-white">{metric.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-3 ml-1">Confusion Matrix Summary</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {stats.results.confusionMatrix.map((item, idx) => (
                                            <div key={idx} className={`p-3 rounded-xl border border-zinc-800 ${item.type} transition-colors hover:border-zinc-700`}>
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] uppercase font-semibold opacity-60 mb-1">{item.label}</span>
                                                    <span className="text-base font-bold">{item.count}</span>
                                                    <span className="text-[10px] opacity-40">{item.percent}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer setCurrentPage={setCurrentPage} />
        </div>
    );
}
