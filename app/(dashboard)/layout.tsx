"use client";
import React, { useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/layouts/AppSideBar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import UserNavigation from "@/components/layouts/UserNavigation";
import { Bell } from "lucide-react";
// import { SearchDialog } from "@/components/layouts/SearchDialog";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <SidebarProvider className=" relative">
      <AppSideBar variant="sidebar" collapsible="icon" />
      <SidebarInset
        data-content-layout={"centered"}
        className={cn(
          // Base background and ensure content takes full width regardless of sidebar state
          "bg-[#ebebeb] !mx-0 !max-w-full w-full",
          // Preserve existing responsive adjustments that are specific to the inset variant
          "max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto"
        )}
      >
        <header
          // data-navbar-style={navbarStyle}
          className={cn(
            " sticky top-0 backdrop-blur-3xl bg-[#ebebeb] z-10 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
            "data-[navbar-style=sticky]:bg-background/50 data-[navbar-style=sticky]:sticky data-[navbar-style=sticky]:top-0 data-[navbar-style=sticky]:z-50 data-[navbar-style=sticky]:overflow-hidden data-[navbar-style=sticky]:rounded-t-[inherit] data-[navbar-style=sticky]:backdrop-blur-md"
          )}
        >
          <div className="flex w-full items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-1 lg:gap-2">
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              {/* <SearchDialog /> */}
            </div>
            <div className="flex items-center justify-center gap-5">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="bg-primary text-white -top-2.5 -right-2.5 h-5 w-5 absolute text-center rounded-full flex justify-center items-center text-xs">
                    5
                  </span>
                  <Bell className="size-4" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">New mention detected</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Jumia Food was mentioned in a positive context on Instagram</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Sentiment spike alert</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Positive mentions increased by 25% in the last hour</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Negative mention alert</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Careem received negative feedback on Twitter</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">3 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Weekly report ready</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Your social listening weekly summary is available</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 day ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Competitor analysis update</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">New insights available for Yassir market performance</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <UserNavigation />
            </div>
          </div>
        </header>
        <div className="h-full p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
