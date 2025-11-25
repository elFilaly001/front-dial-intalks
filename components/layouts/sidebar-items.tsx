import {
  Headphones,
  Users,
  FileText,
  AtSign,
  Smile,
  Eye,
  BarChart2,
  Database,
  RefreshCw,
  Sliders,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Tableau de bord",
    items: [
      {
        title: "Écoute sociale",
        url: "/dashboard/overView",
        icon: Headphones,
      },
      {
        title: "Audience",
        url: "/dashboard/audience",
        icon: Users,
      },
      {
        title: "Publications",
        url: "/dashboard/posts",
        icon: FileText,
      },
      {
        title: "Mentions",
        url: "/dashboard/mentions",
        icon: AtSign,
      },
      {
        title: "Sentiment",
        url: "/dashboard/sentiment",
        icon: Smile,
      },
      // {
      //   title: "Brand Watch",
      //   url: "/reseaux-sociaux/brand-watch",
      //   icon: Megaphone, // brand monitoring
      // },
    ],
  },
  {
    id: 2,
    label: "Veille & Benchmark",
    items: [
      {
        title: "Veille de marque",
        url: "/reseaux-sociaux/brand-watch",
        icon: Eye, // brand overview / monitoring
      },
      {
        title: "Veille concurrentielle",
        url: "/reseaux-sociaux/ranking",
        icon: BarChart2, // benchmarking / comparison charts
      },
      // {
      //   title: "Brand Watch",
      //   url: "/reseaux-sociaux/brand-watch",
      //   icon: Megaphone, // brand monitoring
      // }
    ],
  },
  {
    id: 3,
    label: "Insights & Rapports",
    items: [
      {
        title: "Rapports automatiques",
        url: "/reports",
        icon: RefreshCw, // automatic / recurring reports
      },
      {
        title: "Rapports personnalisés",
        url: "",
        icon: Sliders, // custom / configurable reports
      },
    ],
  },
  {
    id: 4,
    label: "Intégrations",
    items: [
      {
        title: "Données et API",
        url: "/integrations/donnees-api",
        icon: Database,
        comingSoon: true,
      },
      {
        title: "Analyste IA",
        url: "",
        icon: Cpu,
        comingSoon: true,
      },
    ],
  },
];
