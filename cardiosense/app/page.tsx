'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import DisclaimerPage from '@/components/DisclaimerPage';
import AssessmentPage from '@/components/AssessmentPage';
import DataInsights from '@/components/DataInsights';
import ModelInfoPage from '@/components/ModelInfoPage';

export default function Home() {
  // Page navigation state
  const [currentPage, setCurrentPage] = useState('home');

  // Form state
  const [formData, setFormData] = useState({
    age: '',
    gender: '1',
    height: '',
    weight: '',
    ap_hi: '',
    ap_lo: '',
    cholesterol: '1',
    gluc: '1',
    smoke: '0',
    alco: '0',
    active: '1'
  });

  const [result, setResult] = useState<{
    prediction: number;
    confidence: number;
    bmi: number;
    result: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
            console.log('Sending request to Render:', 'https://cardiosense-ai.onrender.com/api/predict');
      const response = await axios.post('https://cardiosense-ai.onrender.com/api/predict', formData);
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openAssessmentPage = () => {
    // Reset form
    setFormData({
      age: '',
      gender: '1',
      height: '',
      weight: '',
      ap_hi: '',
      ap_lo: '',
      cholesterol: '1',
      gluc: '1',
      smoke: '0',
      alco: '0',
      active: '1'
    });
    setResult(null);
    setError(null);
    setCurrentPage('assessment');
  };

  // Render current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'disclaimer':
        return <DisclaimerPage setCurrentPage={setCurrentPage} />;
      case 'insights':
        return (
          <>
            <DataInsights setCurrentPage={setCurrentPage} />
            <Footer setCurrentPage={setCurrentPage} />
          </>
        );
      case 'modelInfo':
        return <ModelInfoPage setCurrentPage={setCurrentPage} />;
      case 'assessment':
        return (
          <AssessmentPage
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
            result={result}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'home':
      default:
        return (
          <>
            <Hero openAssessmentPage={openAssessmentPage} setCurrentPage={setCurrentPage} />
            <HowItWorks />
            <Footer setCurrentPage={setCurrentPage} />
          </>
        );
    }
  };

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openAssessmentPage={openAssessmentPage}
      />

      {/* Page Content with Transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
