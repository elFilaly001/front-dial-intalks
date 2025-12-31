"use client";

import { useState, useRef, useEffect } from "react";

type Action = {
  label: string;
  onClick?: () => void;
};

export default function ActionsDropdown({
  actions,
  className,
}: {
  actions?: Action[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const defaultActions: Action[] = [
    { label: "Share dashboard", onClick: () => console.log("Share") },
    { label: "Email dashboard", onClick: () => console.log("Email") },
    { label: "Report settings", onClick: () => console.log("Report settings") },
    { label: "Set chart colors", onClick: () => console.log("Set chart colors") },
  ];

  const menu = actions ?? defaultActions;

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-expanded={open}
      >
        ACTIONS
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-hidden text-sm z-50">
          {menu.map((a, idx) => (
            <button
              key={idx}
              onClick={() => {
                a.onClick?.();
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
