
"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import DataTable, { TableColumn } from "react-data-table-component";
import formatNumber from "@/lib/numbers";
import { Badge } from "../ui/badge";
import Image from "next/image";

export interface Network {
  network: string;
  profil: string;
  username: string;
  name: string;
  followers: number;
  er: number;
  avgEngage: number;
  avgViews: number;
  metrics: string;
}

// sample competitors to append when there are too few rows or when user wants examples
const SAMPLE_NETWORKS: Network[] = [
  {
    network: "instagram",
    profil: "/media/jumiafood.jpg",
    username: "jumiafood",
    name: "JumiaFood",
    followers: 480000,
    er: 2.4,
    avgEngage: 11500,
    avgViews: 60000,
    metrics: "78",
  },
  {
    network: "instagram",
    profil: "/media/careemnow.jpg",
    username: "careemnow",
    name: "CareemNow",
    followers: 210000,
    er: 1.9,
    avgEngage: 4000,
    avgViews: 22000,
    metrics: "71",
  },
  {
    network: "instagram",
    profil: "/media/yassir.jpg",
    username: "yassir",
    name: "Yassir",
    followers: 75000,
    er: 1.5,
    avgEngage: 1100,
    avgViews: 6000,
    metrics: "65",
  },
  {
    network: "instagram",
    profil: "/media/glovo.jpg",
    username: "glovo",
    name: "Glovo",
    followers: 390000,
    er: 3.0,
    avgEngage: 11700,
    avgViews: 65000,
    metrics: "82",
  },
];

const SocialCoverage = ({ networks }: { networks: Network[] }) => {
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [showSourceMenu, setShowSourceMenu] = useState(false);
  const menuAnchorRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; width: number } | null>(
    null
  );

  // position the portal menu when opened
  useEffect(() => {
    if (!showSourceMenu) return;
    const anchor = menuAnchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const menuWidth = 176; // matches w-44
    const left = Math.max(8, rect.right - menuWidth + window.scrollX);
    const top = rect.bottom + window.scrollY + 4;
    setMenuPosition({ top, left, width: menuWidth });

    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && menuRef.current.contains(target)) return;
      if (anchor.contains(target)) return;
      setShowSourceMenu(false);
    };

    const handleResize = () => setShowSourceMenu(false);

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, true);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, true);
    };
  }, [showSourceMenu]);



  // merge incoming networks with sampleNetworks but avoid duplicates by username
  const mergedNetworks = useMemo(() => {
    const map = new Map<string, Network>();
    // add provided networks first
    (networks || []).forEach((n) => {
      if (n && n.username) map.set(n.username, n);
    });
    // add samples if they don't exist
    SAMPLE_NETWORKS.forEach((s) => {
      if (!map.has(s.username)) map.set(s.username, s);
    });
    return Array.from(map.values());
  }, [networks]);

  // apply source filter and ensure we have at least 6 rows by appending samples if needed
  const displayedNetworks = useMemo(() => {
    const filtered =
      selectedSource === "all"
        ? mergedNetworks
        : mergedNetworks.filter((n) => n.network === selectedSource);

    if (filtered.length >= 6) return filtered;

    // append from SAMPLE_NETWORKS to reach 6 rows (avoid duplicates)
    const result = [...filtered];
    for (const s of SAMPLE_NETWORKS) {
      if (result.length >= 6) break;
      if (!result.find((r) => r.username === s.username)) result.push(s);
    }
    return result;
  }, [mergedNetworks, selectedSource]);

  const columns: TableColumn<Network>[] = [
    {
      name: (
        <div className="flex items-center">
          <div className="relative" ref={menuAnchorRef}>
            <button
              type="button"
              aria-label="Filtrer par source"
              onClick={() => setShowSourceMenu((s) => !s)}
              className="flex items-center gap-2 border px-2 py-1 rounded-md bg-white text-sm"
            >
              <img
                src={selectedSource === "all" ? "/media/instagram.png" : `/media/${selectedSource}.png`}
                alt={selectedSource}
                width={16}
                height={16}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="capitalize">{selectedSource === "all" ? "Instagram" : selectedSource}</span>
              <svg className="ml-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.12 1l-4.25 4.657a.75.75 0 01-1.12 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {showSourceMenu &&
              menuPosition &&
              createPortal(
                <ul
                  ref={menuRef}
                  className="bg-white border rounded-md shadow-md"
                  style={{
                    position: "absolute",
                    top: menuPosition.top,
                    left: menuPosition.left,
                    width: menuPosition.width,
                    zIndex: 99999,
                  }}
                >
                  <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("all"); setShowSourceMenu(false); }}>
                    <img src="/media/instagram.png" alt="instagram" width={16} height={16} />
                    <span>Instagram</span>
                  </li>
                  <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("tiktok"); setShowSourceMenu(false); }}>
                    <img src="/media/tiktok.png" alt="tiktok" width={16} height={16} />
                    <span>TikTok</span>
                  </li>
                  <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("x"); setShowSourceMenu(false); }}>
                    <img src="/media/x.png" alt="x" width={16} height={16} />
                    <span>X</span>
                  </li>
                  <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("youtube"); setShowSourceMenu(false); }}>
                    <img src="/media/youtube.png" alt="youtube" width={16} height={16} />
                    <span>YouTube</span>
                  </li>
                  <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("facebook"); setShowSourceMenu(false); }}>
                    <img src="/media/facebook.png" alt="facebook" width={16} height={16} />
                    <span>Facebook</span>
                  </li>
                  <li className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2" onClick={() => { setSelectedSource("linkedin"); setShowSourceMenu(false); }}>
                    <img src="/media/linkedin.png" alt="linkedin" width={16} height={16} />
                    <span>LinkedIn</span>
                  </li>
                </ul>,
                document.body
              )}
          </div>
        </div>
      ),
      sortable: true,
      selector: (row) => row.network,
      width: "350px",
      cell: (row) => (
        <div className="flex justify-center items-center p-3 gap-3">
          {/* Always use the network logo for the first icon */}
          {/* Try to load the network logo, fallback to SVG X icon if not found */}
          {row.network === "x" ? (
            <Image
              src="/media/x.png"
              alt="X logo"
              width={25}
              height={25}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                  svg.setAttribute("width", "25");
                  svg.setAttribute("height", "25");
                  svg.setAttribute("viewBox", "0 0 24 24");
                  svg.innerHTML = '<path fill="black" d="M17.53 3H21L14.19 10.63L22.09 21H15.63L10.77 14.62L5.29 21H2L9.13 13L1.61 3H8.24L12.68 8.87L17.53 3ZM16.41 19H18.23L7.75 5H5.81L16.41 19Z"/>';
                  parent.insertBefore(svg, parent.firstChild);
                }
              }}
            />
          ) : (
            <Image
              src={`/media/${row.network}.png`}
              alt={row.network + " logo"}
              width={25}
              height={25}
            />
          )}
          {/* Use the profile image for the second icon */}
          <Image
            src={row.profil}
            alt={row.name + " profile"}
            width={35}
            height={35}
            style={{ borderRadius: "50%" }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="text-center">
            <h6>{row.name}</h6>
            <p className="text-sm">@{row.username}</p>
          </div>
        </div>
      ),
    },
    {
      name: "Croissance (90 jours)",
      width: "150px",
      cell() {
        return (
          <Badge className="flex gap-1 items-center bg-emerald-500/20 text-black px-3 py-2 rounded-md">
            <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
            +5,2%
          </Badge>
        );
      },
    },
    {
      name: "Activité (90 jours)",
      width: "150px",
      cell() {
        return <p>10 publications / mois</p>;
      },
    },

    {
      name: "Score",
      width: "150px",
      sortable: true,
      selector: (row) => Number(row.metrics),
      cell: (row) => (
        <div className="">
          <Badge className="flex gap-1 items-center bg-emerald-500/20 text-black px-3 py-2 rounded-md">
            <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
            {row.metrics} %
          </Badge>
        </div>
      ),
    },
    {
      name: "Abonnés",
      sortable: true,
      selector: (row) => row.followers ?? 0,
      cell: (row) => (
        <div className="">
          {row.followers ? <p>{formatNumber(row.followers)}</p> : <p>-</p>}
        </div>
      ),
    },
    {
      name: "Dernière activité",
      width: "150px",
      sortable: true,
      selector: (row) => row.followers ?? 0,
      cell: () => (
        <div className="">
          <Badge className="flex gap-1 items-center bg-emerald-500/20 text-black px-3 py-2 rounded-md text-xs">
            <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
            Cette semaine
          </Badge>
        </div>
      ),
    },
    {
      name: "Taux d&apos;engagement %",
      sortable: true,
      selector: (row) => row.er ?? 0,
      cell: (row) => (
        <div className="">
          <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
          {row.er ? <p>{formatNumber(row.er)} %</p> : <p>-</p>}
        </div>
      ),
    },
    {
      name: "Moy. interactions",
      width: "150px",
      sortable: true,
      selector: (row) => row.avgEngage ?? 0,
      cell: (row) => (
        <div className="">
          <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
          {row.avgEngage ? <p>{formatNumber(row.avgEngage)}</p> : <p>-</p>}
        </div>
      ),
    },
    {
      name: "Moy. vues",
      width: "150px",
      sortable: true,
      selector: (row) => row.avgViews ?? 0,
      cell: (row) => (
        <div className="">
          <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
          {row.avgViews ? <p>{formatNumber(row.avgViews)}</p> : <p>-</p>}
        </div>
      ),
    },
    {
      name: "Habitudes de publication",
      width: "250px",
      cell() {
        return <p>deux fois par semaine à 18h</p>;
      },
    },
  ];

  return (
    <div>
      <h5 className="text-xl font-semibold mb-4">Tableau de Performance Multicanal</h5>
      <DataTable columns={columns} data={networks} />
    </div>
  );
};

export default SocialCoverage;
