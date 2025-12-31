"use client";
import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "@/components/layouts/AppSideBar";
import { cn } from "@/lib/utils";
import UserProfile from "@/components/layouts/UserProfile";
import { Bell, Menu, Settings, LogOut, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { setAuthToken } from "@/services/axiosService";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'notifications' | 'profile'>('notifications');
  const notificationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Set auth token for axios
  useEffect(() => {
    if (status === 'loading') return;
    if (session?.user?.token) {
      setAuthToken(session.user.token);
    }
  }, [status, session]);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'mention',
      color: 'bg-blue-500',
      title: 'Nouvelle mention détectée',
      description: 'Jumia Food a été mentionné dans un contexte positif sur Instagram',
      time: 'Il y a 2 minutes',
      unread: true
    },
    {
      id: 2,
      type: 'alert',
      color: 'bg-green-500',
      title: 'Alerte pic de sentiment',
      description: 'Les mentions positives ont augmenté de 25% dans la dernière heure',
      time: 'Il y a 1 heure',
      unread: true
    },
    {
      id: 3,
      type: 'warning',
      color: 'bg-red-500',
      title: 'Alerte mention négative',
      description: 'Careem a reçu des commentaires négatifs sur Twitter',
      time: 'Il y a 3 heures',
      unread: false
    },
    {
      id: 4,
      type: 'report',
      color: 'bg-amber-500',
      title: 'Rapport hebdomadaire prêt',
      description: 'Votre résumé hebdomadaire d\'écoute sociale est disponible',
      time: 'Il y a 1 jour',
      unread: false
    },
    {
      id: 5,
      type: 'update',
      color: 'bg-purple-500',
      title: 'Mise à jour analyse concurrentielle',
      description: 'Nouveaux insights disponibles sur la performance de Yassir',
      time: 'Il y a 2 jours',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const [Navlink, setNavlink] = useState<string>("");

  useEffect(() => {
    const segment = pathname.split('/')[1];
    switch (segment) {
      case "dashboard":
        setNavlink("Tableau de bord");
        break;
      case "reseaux-sociaux":
        setNavlink("Veille & Benchmark");
        break;
      case "reseaux-sociaux":
        setNavlink("Veille & Benchmark");
        break;
      case "competitive-intelligence":
        setNavlink("Veille & Benchmark");
        break;
      case "reports":
        setNavlink("Insights & Rapports");
        break;
      default:
        setNavlink("");
    }
  }, [pathname]);



  return (
    <SidebarProvider className=" relative">
      <AppSideBar variant="sidebar" collapsible="icon" />
      <SidebarInset
        data-content-layout={"centered"}
        className={cn(
          // Base background and ensure content takes full width regardless of sidebar state
          "bg-[#eaeff9] !mx-0 !max-w-full w-full",
          "max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto"
        )}
      >
        <header
          // data-navbar-style={navbarStyle}
          className={cn(
            " sticky top-0 backdrop-blur-3xl bg-white z-10 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
            "data-[navbar-style=sticky]:bg-background/50 data-[navbar-style=sticky]:sticky data-[navbar-style=sticky]:top-0 data-[navbar-style=sticky]:z-50 data-[navbar-style=sticky]:overflow-hidden data-[navbar-style=sticky]:rounded-t-[inherit] data-[navbar-style=sticky]:backdrop-blur-md"
          )}
        >
          <div className="relative flex w-full items-center justify-between px-4 lg:px-6">
            <SidebarTrigger className="-ml-2 md:hidden" />
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 lg:gap-2 font-medium text-sm text-gray-400">
              {Navlink}
            </div>

            {/* Desktop View - Original Components */}
            <div className="hidden md:flex items-center gap-4 ml-auto">
              <div ref={notificationRef} className="relative flex items-center">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="bg-main text-white -top-0.5 -right-0.5 h-4 w-4 absolute text-center rounded-full flex justify-center items-center text-[10px] font-medium">
                    {unreadCount}
                  </span>
                  <Bell className="size-5" />
                </button>


                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 ${notification.color} rounded-full mt-2 flex-shrink-0`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notification.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{notification.description}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        Voir toutes les notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <UserProfile />
            </div>

            {/* Mobile View - Burger Menu */}
            <div className="flex md:hidden items-center">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="relative flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 bg-main rounded-full" />
                    )}
                    <Menu className="size-5 text-gray-700" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[95vw] max-w-[320px] p-0 bg-white">
                  {/* Mobile Menu Header */}
                  <div className="flex flex-col">
                    {/* User Profile Section */}
                    <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 border-b">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                          <AvatarImage src="/auth/user-avatar.png" alt="User" className="object-cover" />
                          <AvatarFallback className="bg-gradient-to-br from-main/20 to-main/10 text-main font-semibold">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">John Doe</p>
                          <p className="text-xs text-slate-500 truncate">john.doe@in-talks.ma</p>
                          <Badge className="mt-1 text-[9px] px-1.5 py-0 h-4 bg-amber-500 hover:bg-amber-600 text-white border-amber-400">
                            Propriétaire
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex border-b border-gray-200">
                      <button
                        onClick={() => setActiveTab('notifications')}
                        className={cn(
                          "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
                          activeTab === 'notifications'
                            ? "text-main"
                            : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Bell className="size-4" />
                          Notifications
                        </span>
                        {activeTab === 'notifications' && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-main" />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={cn(
                          "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
                          activeTab === 'profile'
                            ? "text-main"
                            : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Settings className="size-4" />
                          Compte
                        </span>
                        {activeTab === 'profile' && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-main" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 overflow-y-auto">
                    {activeTab === 'notifications' ? (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={cn(
                              "p-4 transition-colors cursor-pointer",
                              notification.unread ? "bg-blue-50/50" : "hover:bg-gray-50"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className={cn(
                                "w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ring-4 ring-opacity-20",
                                notification.color,
                                notification.color.replace('bg-', 'ring-')
                              )} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p className={cn(
                                    "text-sm text-gray-900",
                                    notification.unread ? "font-semibold" : "font-medium"
                                  )}>
                                    {notification.title}
                                  </p>
                                  {notification.unread && (
                                    <span className="w-2 h-2 bg-main rounded-full flex-shrink-0 mt-1.5" />
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                  {notification.description}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-1.5 font-medium">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* View All Button */}
                        <div className="p-4">
                          <button className="w-full py-2.5 text-sm font-medium text-main hover:text-main/80 bg-main/5 hover:bg-main/10 rounded-lg transition-colors">
                            Voir toutes les notifications
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        {/* Profile Menu Items */}
                        <div className="space-y-1">
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              window.location.href = '/account';
                            }}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <span className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                                <Settings className="size-4 text-slate-600" />
                              </div>
                              <span className="text-sm font-medium text-gray-700">Paramètres du compte</span>
                            </span>
                            <ChevronRight className="size-4 text-gray-400" />
                          </button>

                          <Separator className="my-2" />

                          <button
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors group"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              console.log("Déconnexion...");
                            }}
                          >
                            <span className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                <LogOut className="size-4 text-red-600" />
                              </div>
                              <span className="text-sm font-medium text-red-600">Se déconnecter</span>
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        <div className="h-full p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
