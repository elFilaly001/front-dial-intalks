"use client";

import * as React from "react";

interface SentimentGaugeProps {
  value: number; // -50 to 50
  label?: string;
}

function SentimentGauge({ value, label }: SentimentGaugeProps) {
  // Clamp value between -50 and 50
  const clampedValue = Math.max(-50, Math.min(50, value));
  
  // For 3/4 circle (270 degrees): starts at 135deg (bottom-left) and ends at 45deg (bottom-right)
  // -50 maps to -135deg, 0 maps to 0deg (top), 50 maps to 135deg
  const angle = (clampedValue / 50) * 135;
  
  // Determine sentiment label based on value
  const getSentimentLabel = () => {
    if (clampedValue > 15) return "POSITIF";
    if (clampedValue < -15) return "NÉGATIF";
    return "NEUTRE";
  };

  const sentimentLabel = label || getSentimentLabel();

  // SVG parameters for 3/4 circle
  const cx = 120; // center x
  const cy = 120; // center y
  const radius = 95;
  
  // Calculate arc endpoints for 270 degree arc (3/4 circle)
  // Start angle: 135 degrees (bottom-left), End angle: 45 degrees (bottom-right, going clockwise through top)
  const startAngle = 135 * (Math.PI / 180);
  const endAngle = 45 * (Math.PI / 180);
  
  const startX = cx + radius * Math.cos(startAngle);
  const startY = cy + radius * Math.sin(startAngle);
  const endX = cx + radius * Math.cos(endAngle);
  const endY = cy + radius * Math.sin(endAngle);

  // Arc paths for the three sections (each 90 degrees = 1/3 of the 270 degree arc)
  // Negative section: 135° to 195° (bottom-left to left-top)
  // Neutral section: 195° to 345° (through top)
  // Positive section: 345° to 45° (top-right to bottom-right)
  
  const negEndAngle = 225 * (Math.PI / 180);
  const neutralEndAngle = 315 * (Math.PI / 180);
  
  const negEndX = cx + radius * Math.cos(negEndAngle);
  const negEndY = cy + radius * Math.sin(negEndAngle);
  const neutralEndX = cx + radius * Math.cos(neutralEndAngle);
  const neutralEndY = cy + radius * Math.sin(neutralEndAngle);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-sm text-gray-500 mb-2">Moyenne du Sentiment</p>
      <div className="relative w-[240px] h-[220px]">
        {/* SVG Gauge */}
        <svg viewBox="0 0 240 240" className="w-full h-full">
          {/* Background track */}
          <path
            d={`M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${endX} ${endY}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />
          
          {/* Colored gauge arc - negative (red) - first 90 degrees */}
          <path
            d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${negEndX} ${negEndY}`}
            fill="none"
            stroke="#ff0c00"
            strokeWidth="10"
            strokeLinecap="round"
          />
          
          {/* Colored gauge arc - neutral (gray) - middle 90 degrees */}
          <path
            d={`M ${negEndX} ${negEndY} A ${radius} ${radius} 0 0 1 ${neutralEndX} ${neutralEndY}`}
            fill="none"
            stroke="#ffbf26"
            strokeWidth="10"
            strokeLinecap="round"
          />
          
          {/* Colored gauge arc - positive (green) - last 90 degrees */}
          <path
            d={`M ${neutralEndX} ${neutralEndY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
            fill="none"
            stroke="#40bb3c"
            strokeWidth="10"
            strokeLinecap="round"
          />
          
          {/* Scale markers */}
          <text x={startX - 5} y={startY + 18} fontSize="11" fill="#6b7280" textAnchor="middle">-50</text>
          <text x={cx} y={cy - radius - 10} fontSize="11" fill="#6b7280" textAnchor="middle">0</text>
          <text x={endX + 5} y={endY + 18} fontSize="11" fill="#6b7280" textAnchor="middle">50</text>
          
          {/* Needle pivot point */}
          <circle cx={cx} cy={cy} r="12" fill="#374151" />
          <circle cx={cx} cy={cy} r="7" fill="#1f2937" />
          
          {/* Needle - professional clock hand style */}
          <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
            {/* Needle shadow for depth */}
            <polygon
              points={`${cx - 4},${cy + 5} ${cx + 4},${cy + 5} ${cx + 2},${cy - radius + 25} ${cx - 2},${cy - radius + 25}`}
              fill="rgba(0,0,0,0.2)"
              transform="translate(2, 2)"
            />
            {/* Main needle body - tapered shape */}
            <polygon
              points={`${cx - 5},${cy + 8} ${cx + 5},${cy + 8} ${cx + 2},${cy - radius + 20} ${cx - 2},${cy - radius + 20}`}
              fill="url(#needleGradient)"
            />
            {/* Needle tip - arrow shape */}
            <polygon
              points={`${cx},${cy - radius + 8} ${cx - 6},${cy - radius + 24} ${cx + 6},${cy - radius + 24}`}
              fill="#1f2937"
            />
            {/* Highlight on needle */}
            <line
              x1={cx - 1}
              y1={cy}
              x2={cx - 1}
              y2={cy - radius + 25}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
          </g>
          
          {/* Gradient definition for needle */}
          <defs>
            <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="50%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
          </defs>
          
          {/* Center cap on top of needle */}
          <circle cx={cx} cy={cy} r="6" fill="#374151" />
          <circle cx={cx} cy={cy} r="4" fill="#6b7280" />
        </svg>
        
        {/* Value display - centered in the gauge */}
        <div className="absolute top-[58%] left-1/2 -translate-x-1/2 text-center">
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{clampedValue.toFixed(1)}</p>
          <p 
            className="text-sm font-semibold"
            style={{
              color: clampedValue > 15 ? "#40bb3c" : clampedValue < -15 ? "#ff0c00" : "#9ca3af"
            }}
          >
            {sentimentLabel}
          </p>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#40bb3c]"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Positif</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#ff0c00]"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Négatif</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#9ca3af]"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Neutre</span>
        </div>
      </div>
    </div>
  );
}

export default SentimentGauge;
