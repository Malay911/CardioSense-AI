'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import Footer from './Footer';

interface FormData {
    age: string;
    gender: string;
    height: string;
    weight: string;
    ap_hi: string;
    ap_lo: string;
    cholesterol: string;
    gluc: string;
    smoke: string;
    alco: string;
    active: string;
}

interface Result {
    prediction: number;
    confidence: number;
    bmi: number;
    result: string;
}

interface AssessmentPageProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    error: string | null;
    result: Result | null;
    setCurrentPage: (page: string) => void;
}

export default function AssessmentPage({
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
    result,
    setCurrentPage
}: AssessmentPageProps) {
    const genderOptions = [
        { value: '1', label: 'Male' },
        { value: '2', label: 'Female' },
    ];

    const cholesterolOptions = [
        { value: '1', label: 'Normal' },
        { value: '2', label: 'Above Normal' },
        { value: '3', label: 'Well Above Normal' },
    ];

    const glucoseOptions = [
        { value: '1', label: 'Normal' },
        { value: '2', label: 'Above Normal' },
        { value: '3', label: 'Well Above Normal' },
    ];

    const yesNoOptions = [
        { value: '0', label: 'No' },
        { value: '1', label: 'Yes' },
    ];

    const inputClass = "w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-zinc-600";
    const labelClass = "text-white font-medium mb-2 text-sm block";
    const descClass = "text-zinc-500 text-xs mb-2";

    return (
        <div className="min-h-screen pt-28 bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto px-6 pb-16">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentPage('home')}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-zinc-800 border border-zinc-700 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </motion.button>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-4">Predict Cardiovascular Risk</h1>
                    <p className="text-zinc-400 text-lg mb-8">
                        Enter your health information below for an AI-powered risk assessment.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                Personal Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Age</label>
                                    <p className={descClass}>Please enter your age in years.</p>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="e.g., 45"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Gender</label>
                                    <p className={descClass}>Biological sex at birth.</p>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className={inputClass + " cursor-pointer"}
                                    >
                                        {genderOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Height (cm)</label>
                                    <p className={descClass}>Measured in centimeters without shoes.</p>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="e.g., 175"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Weight (kg)</label>
                                    <p className={descClass}>Measured in kilograms.</p>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder="e.g., 70"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Medical Examination */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                                Medical Examination
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Systolic Blood Pressure</label>
                                    <p className={descClass}>Upper reading of blood pressure.</p>
                                    <input
                                        type="number"
                                        name="ap_hi"
                                        value={formData.ap_hi}
                                        onChange={handleChange}
                                        placeholder="e.g., 120"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Diastolic Blood Pressure</label>
                                    <p className={descClass}>Lower reading of blood pressure.</p>
                                    <input
                                        type="number"
                                        name="ap_lo"
                                        value={formData.ap_lo}
                                        onChange={handleChange}
                                        placeholder="e.g., 80"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Cholesterol Level</label>
                                    <p className={descClass}>Total cholesterol from latest blood work.</p>
                                    <select
                                        name="cholesterol"
                                        value={formData.cholesterol}
                                        onChange={handleChange}
                                        className={inputClass + " cursor-pointer"}
                                    >
                                        {cholesterolOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Glucose Level</label>
                                    <p className={descClass}>Blood sugar level from last checkup.</p>
                                    <select
                                        name="gluc"
                                        value={formData.gluc}
                                        onChange={handleChange}
                                        className={inputClass + " cursor-pointer"}
                                    >
                                        {glucoseOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Lifestyle Factors */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full" />
                                Lifestyle Factors
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className={labelClass}>Smoking</label>
                                    <p className={descClass}>Do you smoke tobacco?</p>
                                    <select
                                        name="smoke"
                                        value={formData.smoke}
                                        onChange={handleChange}
                                        className={inputClass + " cursor-pointer"}
                                    >
                                        {yesNoOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Alcohol</label>
                                    <p className={descClass}>Regular alcohol consumption?</p>
                                    <select
                                        name="alco"
                                        value={formData.alco}
                                        onChange={handleChange}
                                        className={inputClass + " cursor-pointer"}
                                    >
                                        {yesNoOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Physical Activity</label>
                                    <p className={descClass}>Regular exercise routine?</p>
                                    <select
                                        name="active"
                                        value={formData.active}
                                        onChange={handleChange}
                                        className={inputClass + " cursor-pointer"}
                                    >
                                        {yesNoOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className={`w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
                            {loading ? 'Analyzing...' : 'Predict Cardiovascular Risk'}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center"
                    >
                        <p className="text-blue-400 flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Analyzing patient data...
                        </p>
                    </motion.div>
                )}

                {/* Error State */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                    >
                        <p className="text-red-400 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            <strong>Error:</strong> {error}
                        </p>
                    </motion.div>
                )}

                {/* Result */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`
              mt-8 p-6 rounded-2xl border-2
              ${result.prediction === 1
                                ? 'bg-red-500/10 border-red-500/30'
                                : 'bg-green-500/10 border-green-500/30'
                            }
            `}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {result.prediction === 1 ? (
                                <AlertCircle className="w-8 h-8 text-red-400" />
                            ) : (
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            )}
                            <h2 className={`text-2xl font-bold ${result.prediction === 1 ? 'text-red-400' : 'text-green-400'}`}>
                                {result.result}
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-white/5 rounded-xl p-4">
                                <p className="text-zinc-400 text-sm mb-1">Prediction</p>
                                <p className="text-white font-semibold">
                                    {result.prediction === 1 ? 'High Risk' : 'Low Risk'}
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <p className="text-zinc-400 text-sm mb-1">Confidence</p>
                                <p className="text-white font-semibold">{result.confidence}%</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <p className="text-zinc-400 text-sm mb-1">BMI</p>
                                <p className="text-white font-semibold">{result.bmi}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <Footer setCurrentPage={setCurrentPage} />
        </div>
    );
}
