/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// Custom tooltip for chart insights style
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    const entry = payload[0].payload;
    // Calculate percent
    const total = payload[0].payload.totalValue || payload.reduce((sum: number, p: any) => sum + p.payload.value, 0);
    const percent = total ? ((entry.value / total) * 100).toFixed(1) : '0';
    return (
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        padding: '0.35rem 0.6rem',
        minWidth: '70px',
        color: '#222',
        fontSize: '0.85rem',
        fontWeight: 500,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Image src={entry.icon} alt={entry.name} width={16} height={16} style={{ borderRadius: '3px' }} />
          <span>{entry.name}</span>
          <span style={{ color: '#888', fontSize: '0.8em', marginLeft: '0.25em' }}>{percent}%</span>
        </div>
      </div>
    );
  }
  return null;
};


import formatNumber from "@/lib/numbers";

interface ChartData {
  name: string;
  label: number;
  value: number;
  color: string;
  icon: string;
}

interface FollowersDisptachProps {
  data?: ChartData[];
}

const FollowersDisptach = ({ data }: FollowersDisptachProps) => {
  const defaultData: ChartData[] = [
    {
      name: "YouTube",
      value: 32000,
      label: 32000,
      color: "url(#color-youtube)",
      icon: "/media/youtube.png",
    },
    {
      name: "Instagram",
      value: 112000,
      label: 112000,
      color: "url(#color-instagram)",
      icon: "/media/instagram.png",
    },
    {
      name: "TikTok",
      value: 45000,
      label: 45000,
      color: "url(#color-tiktok)",
      icon: "/media/tiktok.png",
    },
    {
      name: "Twitter",
      value: 45000,
      label: 45000,
      color: "url(#color-twitter)",
      icon: "/media/twitter.png?v=12",
    },
    {
      name: "LinkedIn",
      value: 98000,
      label: 98000,
      color: "url(#color-linkedin)",
      icon: "/media/linkedin.png",
    },
    {
      name: "Facebook",
      value: 98000,
      label: 98000,
      color: "url(#color-facebook)",
      icon: "/media/facebook.png",
    },
  ].sort((a, b) => b.value - a.value);

  const dataChart = (data || defaultData).sort((a, b) => b.value - a.value);

  // Show all segments, not just those with value > 1
  // Add totalValue to each entry for tooltip percent calculation
  const totalValue = dataChart.reduce((sum, entry) => sum + entry.value, 0);
  const filteredChartData = dataChart.map(entry => ({ ...entry, totalValue }));

  return (
    <div className="flex flex-col gap-5 border-gray-200 pl-12">
  <Label className=" text-start">Répartition des abonnés</Label>
      <div className="chart-container flex items-center gap-5">
        {/* Increased width and height */}
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <defs>
              <linearGradient id="color-youtube" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff0000" />
              </linearGradient>
              <linearGradient id="color-tiktok" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#000000" />
              </linearGradient>
              <linearGradient id="color-instagram" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4f5bd5" />
                <stop offset="25%" stopColor="#962fbf" />
                <stop offset="50%" stopColor="#d62976" />
                <stop offset="75%" stopColor="#fa7e1e" />
                <stop offset="100%" stopColor="#feda75" />
              </linearGradient>
              <linearGradient id="color-twitter" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1DA1F2" />
              </linearGradient>
              <linearGradient id="color-linkedin" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0077B5" />
                <stop offset="100%" stopColor="#005582" />
              </linearGradient>
              <linearGradient id="color-facebook" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1877F2" />
                <stop offset="100%" stopColor="#145DBF" />
              </linearGradient>
            </defs>
            <Pie
              data={filteredChartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={0} // full disk
              outerRadius={80}
              stroke="transparent"
              paddingAngle={0}
            >
              {filteredChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="legend">
          {filteredChartData.map(
            (entry, index) =>
              entry.label && (
                <div
                  key={`legend-item-${index}`}
                  className="legend-item flex items-center gap-2"
                >
                  <Image
                    src={entry.icon}
                    alt={entry.icon}
                    width={17}
                    height={17}
                  />
                  <span>{formatNumber(entry.label)}</span>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersDisptach;
