'use client';

import React from 'react';

interface LogoProps {
    className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Gradient Definitions */}
            <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0 }} />
                    <stop offset="50%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 0 }} />
                </linearGradient>
            </defs>

            {/* Outer Circle with Gradient Border */}
            <circle cx="24" cy="24" r="22" stroke="url(#heartGradient)" strokeWidth="2" fill="none" opacity="0.3" />

            {/* Heart Shape with Gradient Fill */}
            <path
                d="M24 38C24 38 11 29 11 19C11 15.134 14.134 12 18 12C20.395 12 22.516 13.234 24 15.09C25.484 13.234 27.605 12 30 12C33.866 12 37 15.134 37 19C37 29 24 38 24 38Z"
                fill="url(#heartGradient)"
                opacity="0.9"
            />

            {/* ECG/Pulse Line */}
            <path
                d="M9 24 L15 24 L18 18 L21 30 L24 24 L27 24 L30 18 L33 30 L36 24 L39 24"
                stroke="url(#pulseGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.8"
            />

            {/* Center Pulse Dot */}
            <circle cx="24" cy="24" r="2.5" fill="#fff" opacity="0.9">
                <animate attributeName="r" values="2.5;4;2.5" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.5s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}
