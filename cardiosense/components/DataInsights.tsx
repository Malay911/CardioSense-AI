'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Database,
    Brain,
    Heart,
    Activity,
    TrendingUp,
    BarChart3,
    Zap
} from 'lucide-react';

interface DataInsightsProps {
    setCurrentPage: (page: string) => void;
}

const DataInsights = ({ setCurrentPage }: DataInsightsProps) => {
    const dataStats = [
        { label: 'Raw Records', sublabel: 'Before cleaning', value: '70,000', icon: Database },
        { label: 'Rows Removed', sublabel: 'Outliers/Invalid', value: '1,328', icon: TrendingUp },
        { label: 'Final Records', sublabel: 'Used for training', value: '68,672', icon: BarChart3 },
    ];

    const idealRanges = [
        { metric: 'Blood Pressure', systolic: '< 120 / 80', diastolic: 'mmHg', icon: Activity, color: 'from-red-500 to-pink-500' },
        { metric: 'Cholesterol', systolic: 'Normal', diastolic: '< 200 mg/dL', icon: Heart, color: 'from-orange-500 to-amber-500' },
        { metric: 'BMI', systolic: 'Healthy Range', diastolic: '18.5 - 24.9', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
        { metric: 'Resting Heart Rate', systolic: 'Normal', diastolic: '60-100 bpm', icon: Zap, color: 'from-blue-500 to-cyan-500' },
    ];

    const modelPerformance = [
        { model: 'Random Forest (Tuned)', accuracy: 73.30, color: 'from-blue-500 to-cyan-400' },
        { model: 'Random Forest (Untuned)', accuracy: 72.32, color: 'from-green-500 to-emerald-400' },
        { model: 'Logistic Regression (Tuned)', accuracy: 71.95, color: 'from-purple-500 to-violet-400' },
    ];

    const correlatedFactors = [
        { factor: 'ap_hi', value: 0.43, positive: true },
        { factor: 'ap_lo', value: 0.34, positive: true },
        { factor: 'age', value: 0.24, positive: true },
        { factor: 'cholesterol', value: 0.22, positive: true },
        { factor: 'bmi', value: 0.19, positive: true },
        { factor: 'weight', value: 0.18, positive: true },
        { factor: 'gluc', value: 0.09, positive: true },
        { factor: 'active', value: -0.04, positive: false },
        { factor: 'smoke', value: -0.02, positive: false },
    ];

    // Correlation matrix data for heatmap
    const features = ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'cardio', 'bmi', 'pulse_pressure', 'high_bp'];
    const correlationMatrix = [
        [1.00],
        [-0.02, 1.00],
        [-0.09, 0.53, 1.00],
        [0.06, 0.15, 0.31, 1.00],
        [0.21, 0.06, 0.02, 0.27, 1.00],
        [0.16, 0.07, 0.03, 0.25, 0.73, 1.00],
        [0.16, -0.04, -0.06, 0.13, 0.19, 0.16, 1.00],
        [0.10, -0.03, -0.02, 0.10, 0.09, 0.07, 0.44, 1.00],
        [-0.05, 0.34, 0.20, 0.06, 0.02, 0.02, 0.00, -0.01, 1.00],
        [-0.03, 0.17, 0.10, 0.06, 0.03, 0.04, 0.03, 0.01, 0.34, 1.00],
        [-0.01, 0.01, -0.01, -0.01, 0.00, 0.00, 0.02, -0.00, 0.03, 0.03, 1.00],
        [0.24, 0.00, -0.01, 0.18, 0.43, 0.34, 0.21, 0.08, -0.02, -0.01, -0.03, 1.00],
        [0.11, -0.12, -0.20, 0.86, 0.27, 0.24, 0.17, 0.12, -0.04, 0.01, -0.01, 0.19, 1.00],
        [0.18, 0.03, -0.00, 0.18, 0.84, 0.24, 0.14, 0.07, 0.01, 0.02, 0.00, 0.33, 0.18, 1.00],
        [0.11, 0.03, -0.01, 0.17, 0.73, 0.56, 0.12, 0.05, 0.01, 0.02, 0.01, 0.30, 0.18, 0.59, 1.00],
    ];

    const getCorrelationColor = (value: number) => {
        const absValue = Math.abs(value);
        if (value === 1) return 'bg-white'; // Skip diagonal highlighting for now to match image
        if (value > 0) {
            if (absValue > 0.8) return 'bg-[#d35a5a]'; // Strong red
            if (absValue > 0.6) return 'bg-[#da7d7d]';
            if (absValue > 0.4) return 'bg-[#e2a0a0]';
            if (absValue > 0.2) return 'bg-[#eac4c4]';
            if (absValue > 0.1) return 'bg-[#f1e7e7]';
            return 'bg-zinc-100';
        } else {
            if (absValue > 0.6) return 'bg-[#5a8cd3]'; // Strong blue
            if (absValue > 0.4) return 'bg-[#7da1da]';
            if (absValue > 0.2) return 'bg-[#a0bae2]';
            if (absValue > 0.1) return 'bg-[#c4d4eb]';
            return 'bg-zinc-100';
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setCurrentPage('home')}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                </motion.button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Data Insights</h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Key trends, patterns and model summary generated from the dataset.
                        These insights are for research and educational use only.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Data Source Section */}
                    <motion.section variants={itemVariants} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                            <Database className="w-5 h-5 text-blue-400" />
                            Data Source
                        </h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            The dataset is sourced from <span className="text-blue-400">Kaggle</span>, initially containing 70,000 records. Data cleaning removed 1,328 entries (1.9%), resulting in a final dataset of <span className="text-white font-medium">68,672 records</span> for model engineering.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {dataStats.map((stat) => (
                                <div key={stat.label} className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <stat.icon className="w-4 h-4 text-zinc-500" />
                                        <span className="text-zinc-400 text-sm">{stat.label}</span>
                                    </div>
                                    <p className="text-xs text-zinc-500 mb-2">{stat.sublabel}</p>
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Understanding CVD & Ideal Ranges */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Understanding CVD */}
                        <motion.section variants={itemVariants} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-red-400" />
                                Understanding CVD
                            </h2>
                            <p className="text-zinc-500 text-sm mb-4">What CVD is, how it affects life and how the model helps.</p>
                            <div className="space-y-4 text-sm text-zinc-400">
                                <p>
                                    <span className="text-white font-medium">Cardiovascular disease (CVD)</span> is an umbrella term for conditions that affect the heart and blood vessels — including coronary artery disease, heart attack and stroke. Lifestyle, metabolism (such as blood pressure, cholesterol, glucose), and age are common drivers.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-zinc-500">
                                    <li>Impact: reduces physical capacity, increases long-term care needs, and raises risk of sudden events.</li>
                                    <li>Prevention: early detection of risk factors (BP, cholesterol, BMI, glucose, activity) decreases long-term risks.</li>
                                    <li>Model role: the ML model identifies patterns in historical clinical data to estimate risk probabilities — useful for screening and research, not a diagnosis.</li>
                                </ul>
                                <p className="text-zinc-600 text-xs mt-4 italic">
                                    Predictions are for research/educational use. Consult healthcare professionals for medical decisions.
                                </p>
                            </div>
                        </motion.section>

                        {/* Ideal Ranges */}
                        <motion.section variants={itemVariants} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-green-400" />
                                Ideal Ranges
                            </h2>
                            <p className="text-zinc-500 text-sm mb-4">Common healthy targets</p>
                            <div className="grid grid-cols-2 gap-3">
                                {idealRanges.map((range) => (
                                    <div key={range.metric} className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                                        <div className={`w-8 h-8 bg-gradient-to-br ${range.color} rounded-lg flex items-center justify-center mb-2`}>
                                            <range.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <p className="text-white text-sm font-medium">{range.metric}</p>
                                        <p className="text-zinc-400 text-xs">{range.systolic}</p>
                                        <p className="text-zinc-500 text-xs">{range.diastolic}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-zinc-600 text-xs mt-4">
                                Values outside these ranges can indicate cardiovascular risk. See a professional.
                            </p>
                        </motion.section>
                    </div>

                    {/* Model Performance & Top Correlated Factors */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Model Performance */}
                        <motion.section variants={itemVariants} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-400" />
                                Model Performance
                            </h2>
                            <p className="text-zinc-500 text-sm mb-4">Cross-validation accuracy (%)</p>
                            <div className="space-y-4">
                                {modelPerformance.map((model) => (
                                    <div key={model.model} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-300 text-sm">{model.model}</span>
                                            <span className="text-white font-semibold">{model.accuracy}%</span>
                                        </div>
                                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${model.accuracy}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className={`h-full bg-gradient-to-r ${model.color} rounded-full`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Top Correlated Factors */}
                        <motion.section variants={itemVariants} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-cyan-400" />
                                Top Correlated Factors
                            </h2>
                            <p className="text-zinc-500 text-sm mb-4">Features most associated with target</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {correlatedFactors.map((factor) => (
                                    <span
                                        key={factor.factor}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${factor.positive
                                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                            }`}
                                    >
                                        {factor.factor}: {factor.value > 0 ? '+' : ''}{factor.value.toFixed(2)}
                                    </span>
                                ))}
                            </div>
                            <p className="text-zinc-600 text-xs">
                                Correlation ranges from -1 (strong negative) to +1 (strong positive). Values near 0 indicate little linear relationship.
                            </p>
                        </motion.section>
                    </div>

                    {/* Feature Correlation Heatmap */}
                    <motion.section variants={itemVariants} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-orange-400" />
                            Feature Correlation Heatmap
                        </h2>
                        <p className="text-zinc-500 text-sm mb-6">Visual representation of pairwise relationships</p>

                        <div className="overflow-x-auto mt-6 pb-8 px-4 bg-white/5 pt-12 rounded-xl border border-white/10 relative">
                            <div className="min-w-[1000px] flex items-start justify-center gap-16 px-8">
                                <div className="flex flex-col items-center">
                                    {/* Column Headers */}
                                    <div className="flex mb-2 ml-32">
                                        {features.map((feature, idx) => (
                                            <div
                                                key={feature}
                                                className="w-12 h-28 flex items-end justify-center"
                                            >
                                                <span className="text-[11px] text-zinc-400 transform -rotate-90 origin-center whitespace-nowrap mb-4 font-semibold uppercase tracking-wider">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Rows */}
                                    {correlationMatrix.map((row, rowIndex) => (
                                        <div key={features[rowIndex]} className="flex items-center -mt-[1px]">
                                            <div className="w-32 shrink-0 text-right pr-4">
                                                <span className="text-[12px] text-zinc-300 font-bold uppercase tracking-tight">{features[rowIndex]}</span>
                                            </div>
                                            {features.map((_, colIndex) => {
                                                const value = row[colIndex];
                                                const isVisible = colIndex <= rowIndex;
                                                return (
                                                    <div
                                                        key={`${rowIndex}-${colIndex}`}
                                                        className={`w-12 h-10 flex items-center justify-center border border-[#0a0a0a]/30 relative transition-all duration-300 hover:scale-110 hover:z-10 ${isVisible ? getCorrelationColor(value) : 'bg-transparent border-none'}`}
                                                        title={isVisible ? `${features[rowIndex]} vs ${features[colIndex]}: ${value.toFixed(2)}` : ''}
                                                    >
                                                        {isVisible && (
                                                            <span className={`text-[10px] font-bold ${Math.abs(value) > 0.4 ? 'text-white' : 'text-zinc-800'}`}>
                                                                {value === 1 ? '-' : value.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>

                                {/* Vertical Intensity Bar (Legend) */}
                                <div className="flex flex-col items-center gap-4 pt-32 shrink-0">
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 mb-2">
                                        Intensity scale
                                    </span>
                                    <div
                                        className="w-7 h-[450px] rounded-sm relative border border-white/20 shadow-2xl"
                                        style={{
                                            background: 'linear-gradient(to bottom, #d35a5a 0%, #f1e7e7 40%, #ffffff 50%, #c4d4eb 60%, #5a8cd3 100%)'
                                        }}
                                    >
                                        {/* Reference ticks */}
                                        {[1.0, 0.75, 0.5, 0.25, 0.0, -0.25, -0.5, -0.75, -1.0].map((tick) => (
                                            <div
                                                key={tick}
                                                className="absolute w-full flex items-center"
                                                style={{ top: `${((1 - tick) / 2) * 100}%` }}
                                            >
                                                <div className="w-1.5 h-[1.5px] bg-white absolute -right-1.5" />
                                                <span className="absolute -right-12 text-[11px] text-zinc-300 font-mono font-bold">
                                                    {tick.toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500 rounded" />
                                <span className="text-xs text-zinc-400">Negative correlation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-500 rounded" />
                                <span className="text-xs text-zinc-400">Positive correlation</span>
                            </div>
                        </div>
                        <p className="text-zinc-600 text-xs text-center mt-4">
                            Darker shades = stronger correlation. Use alongside feature importance for model interpretation.
                        </p>
                    </motion.section>
                </motion.div>
            </div>
        </div>
    );
};

export default DataInsights;
