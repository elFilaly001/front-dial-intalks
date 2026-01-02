"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import SessionProvider from '@/components/auth/SessionProvider';
import AppSideBar from "@/components/layouts/AppSideBar";
import { cn } from "@/lib/utils";
import {
    ArrowRight,
    Headphones,
    Users,
    FileText,
    AtSign,
    Smile,
    Eye,
    BarChart2,
    MedalIcon,
    RefreshCw,
    Sliders
} from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
    const { data: session, status } = useSession();
    const dashboardItems = [
        {
            icon: Headphones,
            title: "Écoute Sociale",
            description: "Surveillez les conversations en temps réel",
            url: "/dashboard/overView",
        },
        {
            icon: Users,
            title: "Audience",
            description: "Analysez votre audience et ses comportements",
            url: "/dashboard/audience",
        },
        {
            icon: FileText,
            title: "Publications",
            description: "Gérez et analysez vos publications",
            url: "/dashboard/posts",
        },
        {
            icon: AtSign,
            title: "Mentions",
            description: "Suivez toutes vos mentions",
            url: "/dashboard/mentions",
        },
        {
            icon: Smile,
            title: "Sentiments",
            description: "Comprenez le sentiment de votre audience",
            url: "/dashboard/sentiment",
        },
        {
            icon: Eye,
            title: "Veille de Marque",
            description: "Surveillez votre image de marque",
            url: "/reseaux-sociaux/brand-watch",
        },
        {
            icon: BarChart2,
            title: "Veille Concurrentielle",
            description: "Analysez vos concurrents",
            url: "/competitive-intelligence",
        },
        {
            icon: MedalIcon,
            title: "Classements",
            description: "Découvrez les classements du marché",
            url: "/reseaux-sociaux/ranking",
        },
        {
            icon: RefreshCw,
            title: "Rapports Automatiques",
            description: "Accédez à vos rapports générés",
            url: "/reports",
        },
        {
            icon: Sliders,
            title: "Rapports Personnalisés",
            description: "Créez des rapports sur mesure",
            url: "/reports/custom",
        },
    ];
    const [token, setToken] = React.useState<string >("");
    useEffect(() => {
        const checkToken = () => {
            const sessionToken = session?.user?.token || "";
            const localToken = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
            setToken(sessionToken || localToken);
        };

        checkToken();

        // Also check token on storage events (in case it changes)
        const handleStorageChange = () => checkToken();
        window.addEventListener('storage', handleStorageChange);

        // Debug: log all session values
        console.log('[WelcomePage] useSession status:', status);
        console.log('[WelcomePage] session:', session);
        if (session && session.user) {
            console.log('[WelcomePage] session.user:', session.user);
            console.log('[WelcomePage] session.user.token:', session.user.token);
            console.log('[WelcomePage] session.user.id:', session.user.id);
            console.log('[WelcomePage] session.user.email:', session.user.email);
            console.log('[WelcomePage] session.user.name:', session.user.name);
            console.log('[WelcomePage] session.user.image:', session.user.image);
        }

        return () => window.removeEventListener('storage', handleStorageChange);
    }, [session, status]);

    return (
        <SidebarProvider className="relative">
            <AppSideBar variant="sidebar" collapsible="icon" />
            <SidebarInset
                data-content-layout={"centered"}
                className={cn(
                    "bg-[#f8f9fa] !mx-0 !max-w-full w-full",
                    "max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto"
                )}
            >
                    {/* Main Content */}
                    <div className=" overflow-y-hidden flex flex-col">
                        {/* Hero Section */}
                        <div className="flex-1 flex flex-col items-center px-6 py-12 relative overflow-hidden">
                            {/* Subtle Background */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-60"></div>
                                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-60"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 max-w-6xl mx-auto text-center w-full">

                                {/* Badge */}
                                {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
                                <Sparkles className="w-4 h-4 text-cyan-500" />
                                <span className="text-sm font-medium text-cyan-600">
                                    Plateforme d&apos;Intelligence Sociale propulsée par l&apos;IA
                                </span>
                            </div> */}

                                {/* Heading */}
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                    Bienvenue sur{" "}
                                    <span className="text-cyan-500">
                                        InTalks
                                    </span>
                                </h1>

                                {/* Subheading */}
                                <p className="text-sm text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                                    Transformez votre intelligence de marque avec l&apos;écoute sociale en temps réel,
                                    l&apos;analyse concurrentielle et des insights alimentés par l&apos;IA.
                                </p>

                                {/* CTA Button */}
                                <div className="flex justify-center mb-12">
                                    <Link
                                        href={token ? "/dashboard/overView" : "/login"}
                                        className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:bg-cyan-600 hover:shadow-xl transition-all duration-300"
                                    >
                                        <span>Commencer l&apos;expérience</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Dashboard Options Grid */}
                                <div className="mb-12">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Accès rapide aux fonctionnalités</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {dashboardItems.map((item, index) => (
                                            <Link
                                                key={index}
                                                href={token ? item.url : "/login"}
                                                className="group bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all duration-300 hover:-translate-y-1"
                                            >
                                                <div className="flex flex-col items-center text-center">
                                                    <div className="inline-flex p-3 rounded-xl bg-cyan-50 group-hover:bg-cyan-100 transition-colors mb-3">
                                                        <item.icon className="w-5 h-5 text-cyan-500" />
                                                    </div>
                                                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
    );
}
