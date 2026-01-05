import { ImageResponse } from 'next/og';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Gradient Definitions */}
                <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                </defs>

                {/* Rounded Rectangle Background */}
                <rect width="32" height="32" rx="7" fill="url(#bgGradient)" />

                {/* Activity/Pulse Icon (matching lucide Activity icon) */}
                <path
                    d="M8 16H11L13 10L16 22L19 16H24"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </svg>
        ),
        {
            ...size,
        }
    );
}
