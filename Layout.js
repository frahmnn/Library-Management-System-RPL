import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
    BookOpen, 
    LayoutDashboard, 
    Package, 
    ClipboardList, 
    BarChart3,
    Library
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Master Buku",
    url: createPageUrl("MasterBuku"),
    icon: BookOpen,
  },
  {
    title: "Kebutuhan Buku",
    url: createPageUrl("KebutuhanBuku"),
    icon: ClipboardList,
  },
  {
    title: "Stock Buku",
    url: createPageUrl("StockBuku"),
    icon: Package,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --color-primary: #1e3a8a;
          --color-secondary: #3b82f6;
          --color-accent: #06b6d4;
          --color-background: #f8fafc;
          --color-surface: #ffffff;
          --color-text: #1e293b;
          --color-text-light: #64748b;
        }
        body {
          background-color: var(--color-background);
          color: var(--color-text);
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-slate-50">
        <Sidebar className="border-r border-blue-200">
          <SidebarHeader className="border-b border-blue-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <Library className="w-6 h-6 text-blue-100" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-blue-900">Perpustakaan Pribadi</h2>
                <p className="text-xs text-blue-700">Sistem Manajemen Buku</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-blue-800 uppercase tracking-wider px-2 py-3">
                Menu Utama
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-100 hover:text-blue-800 transition-all duration-300 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-blue-200 text-blue-900 shadow-sm' : 'text-blue-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-blue-800 uppercase tracking-wider px-2 py-3">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700">Total Buku</span>
                    <span className="ml-auto font-bold text-blue-900">0</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Package className="w-4 h-4 text-green-600" />
                    <span className="text-blue-700">Stok Tersedia</span>
                    <span className="ml-auto font-bold text-green-600">0</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <ClipboardList className="w-4 h-4 text-orange-600" />
                    <span className="text-blue-700">Kebutuhan</span>
                    <span className="ml-auto font-bold text-orange-600">0</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-blue-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-blue-900 text-sm truncate">Admin</p>
                <p className="text-xs text-blue-700 truncate">Kelola perpustakaan</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-blue-200 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-blue-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-blue-900">Perpustakaan Pribadi</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}