"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Map of path segments to display names
const pathNameMap: Record<string, string> = {
  "ai-analyste": "AI Analyste",
  "audience": "Audience",
  "mentions": "Mentions",
  "sentiments": "Sentiments",
  "social-listening": "Social Listening",
  "dashboard": "Dashboard",
  "reseaux-sociaux": "Réseaux Sociaux",
  "competitive-intelligence": "Competitive Intelligence",
  "reports": "Reports",
  "personal-reports": "Personal Reports",
  "account": "Account",
};

export default function Cucumber({
  title = "",
  subtitle,
  className,
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const pathname = usePathname();
  
  // Generate breadcrumb items from the pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  
  // Build breadcrumb items with proper hrefs
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const displayName = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { href, displayName, segment };
  });

  return (
    <div className={`flex flex-col gap-1 ${className ?? ""}`}>
      {/* Breadcrumb Navigation */}
      {breadcrumbItems.length > 1 && (
        <nav className="flex items-center gap-1 text-sm">
          {breadcrumbItems.map((item, index) => (
            <div key={item.href} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              )}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-main font-medium">{item.displayName}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {item.displayName}
                </Link>
              )}
            </div>
          ))}
        </nav>
      )}
      
      {/* Title and Subtitle */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{title}</div>
          {subtitle && (
            <div className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}
