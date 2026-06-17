"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiUsers, 
  FiPackage, 
  FiList, 
  FiImage, 
  FiFileText,
  FiHome,
  FiLayers,
  FiBookOpen,
  FiGrid,
  FiSettings,
  FiLogOut
} from "react-icons/fi";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: FiHome, group: "main" },
    { 
      href: "/admin/add-categories", 
      label: "Categories", 
      icon: FiLayers, 
      group: "catalog" 
    },
    { 
      href: "/admin/add-products", 
      label: "Add Product", 
      icon: FiPackage, 
      group: "catalog" 
    },
    { 
      href: "/admin/list-products", 
      label: "Products", 
      icon: FiGrid, 
      group: "catalog" 
    },
    { 
      href: "/admin/add-banner", 
      label: "Banners", 
      icon: FiImage, 
      group: "marketing" 
    },
    { 
      href: "/admin/add-blogs", 
      label: "Write Blog", 
      icon: FiFileText, 
      group: "blog" 
    },
    { 
      href: "/admin/list-blog", 
      label: "Blogs", 
      icon: FiBookOpen, 
      group: "blog" 
    },
     { 
      href: "/admin/admin-enquries", 
      label: "Enquiries", 
      icon: FiList, 
      group: "enquiries" 
    },
     { 
      href: "/admin/admin-contact", 
      label: "Enquiries Contact", 
      icon: FiList, 
      group: "enquiries contact" 
    },
    // { 
    //   href: "/admin/settings", 
    //   label: "Settings", 
    //   icon: FiSettings, 
    //   group: "settings" 
    // },
  ];

  const navGroups = {
    main: "Overview",
    catalog: "Catalog Management",
    marketing: "Marketing",
    blog: "Blog",
    enquiries: "Enquiries",
    "enquiries contact": "Enquiries Contact",
    settings: "System",
  };

  const isActiveLink = (href) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-2xl">
      {/* Logo & Brand Section */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#a13045] to-[#c23b54] rounded-lg flex items-center justify-center shadow-lg">
            <FiUsers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Admin<span className="text-[#a13045]">Hub</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Content Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        {Object.entries(navGroups).map(([group, title]) => {
          const groupItems = navItems.filter(item => item.group === group);
          if (groupItems.length === 0) return null;

          return (
            <div key={group} className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold px-4 mb-3">
                {title}
              </h3>
              <div className="space-y-1.5">
                {groupItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveLink(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                        transition-all duration-200 ease-in-out
                        ${isActive 
                          ? "bg-gradient-to-r from-[#a13045] to-[#b3364d] text-white shadow-lg shadow-[#a13045]/20" 
                          : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
                        }
                      `}
                    >
                      <span className={`
                        ${isActive ? "text-white" : "text-gray-400"}
                        transition-colors duration-200
                      `}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <span>{item.label}</span>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-700/50 bg-gray-800/30">
        <div className="px-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@example.com</p>
            </div>
            <button 
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Logout"
            >
              <FiLogOut className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          v2.0.0 • © 2024 AdminHub
        </p>
      </div>
    </aside>
  );
}