import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { 
  Moon, 
  Sun, 
  Search,
  Bell,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Bookmark,
  Settings,
  LogOut,
  User,
  Home,
  BookText,
  Phone,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "Business",
  "Self-Help",
];

const navigationItems = [
  {
    path: "/",
    label: "Home",
    icon: <Home className="h-4 w-4" />,
    description: "Return to homepage"
  },
  {
    path: "/Course",
    label: "Course",
    icon: <BookText className="h-4 w-4" />,
    description: "Browse our courses"
  },
  {
    path: "/contact",
    label: "Contact",
    icon: <Phone className="h-4 w-4" />,
    description: "Get in touch with us"
  },
  {
    path: "/about",
    label: "About",
    icon: <Info className="h-4 w-4" />,
    description: "Learn about us"
  },
  {
    path: "/Cart",
    label: "Cart",
    icon: <ShoppingCart className="h-4 w-4" />,
    description: "View your cart"
  }
];

const Nav = () => (
  <>
    {navigationItems.map((item) => (
      <li key={item.path}>
        <NavLink 
          to={item.path} 
          className={({ isActive }) => 
            `hover:text-primary transition-colors relative group py-2 flex items-center gap-2 ${isActive ? 'text-primary' : ''}`
          }
          title={item.description}
        >
          <span className="hidden lg:block">{item.icon}</span>
          {item.label}
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </NavLink>
      </li>
    ))}
  </>
);

export default function NavBar() {
  const { register, handleSubmit } = useForm();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Example cart count
  const [notificationCount, setNotificationCount] = useState(3); // Example notification count
  
  function onSubmit(event) {
    console.log(event);
  }
  
  const { setTheme, theme } = useTheme();

  const [active, setActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="container mx-auto">
        <div className="navbar gap-4">
          <div className="navbar-start">
            <div className="dropdown">
              <Sheet>
                <SheetTrigger>
                  <button
                    tabIndex={0}
                    className="btn btn-ghost lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Menu"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                      <BookOpen className="h-6 w-6" />
                      BookStore
                    </SheetTitle>
                    <SheetDescription>
                      <ul className="menu menu-lg gap-2 mt-4">
                        {navigationItems.map((item) => (
                          <li key={item.path}>
                            <NavLink
                              to={item.path}
                              className={({ isActive }) =>
                                `flex items-center gap-3 py-2 ${isActive ? 'text-primary' : ''}`
                              }
                              onClick={() => document.querySelector('button[aria-label="Menu"]').click()}
                            >
                              {item.icon}
                              <span>{item.label}</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                                {item.description}
                              </span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            
            <a href="/" className="btn btn-ghost gap-2 text-xl font-bold tracking-tight hover:bg-transparent">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="hidden sm:inline">BookStore</span>
            </a>

            {/* Categories Dropdown */}
            <div className="hidden lg:block ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="btn btn-ghost gap-2">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category} className="cursor-pointer">
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="navbar-center hidden lg:flex items-center space-x-1">
            <ul className="menu menu-horizontal px-1 space-x-2">
              <Nav />
            </ul>
          </div>

          <div className="navbar-end gap-2">
            {/* Search Bar */}
            <div className={`${showSearch ? 'flex' : 'hidden md:flex'} items-center max-w-xs w-full relative group`}>
              <input
                type="text"
                placeholder="Search books..."
                className="input input-bordered w-full pl-10 pr-4 h-10 bg-gray-50 dark:bg-gray-800 focus:ring-2 ring-primary/20"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            
            <button 
              className="btn btn-ghost btn-circle md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>

            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-2">
                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                  <Sun className="h-4 w-4 mr-2" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                  <Moon className="h-4 w-4 mr-2" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-2">
                <DropdownMenuItem className="cursor-pointer">
                  <Bookmark className="h-4 w-4 mr-2" />
                  New Bookmarks
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Icon */}
            <NavLink to="/cart" className="btn btn-ghost btn-circle relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-2">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Add these styles to your CSS */}
      <style jsx>{`
        .navbar {
          height: 4rem;
        }

        @media (min-width: 1024px) {
          .navbar {
            height: 5rem;
          }
        }

        .menu-item-active {
          color: var(--primary);
        }

        .menu-item-active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--primary);
        }
      `}</style>
    </nav>
  );
}
