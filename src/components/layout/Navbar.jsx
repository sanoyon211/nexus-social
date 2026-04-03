import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  RiHome5Line, RiHome5Fill, RiSearch2Line, RiNotification3Line,
  RiMessage3Line, RiUserLine, RiCompass3Line, RiMenuLine, RiFireLine,
} from "react-icons/ri";
import { useApp } from "../../context/AppContext";
import Avatar from "../ui/Avatar";

export default function Navbar({ onMenuToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, unreadNotifications, markNotificationsRead, setSearchQuery, searchQuery, setCreatePostOpen } = useApp();
  const [searchFocused, setSearchFocused] = useState(false);

  const navItems = [
    { path: "/", icon: RiHome5Line, activeIcon: RiHome5Fill, label: "Home" },
    { path: "/friends", icon: RiUserLine, label: "Friends" },
    { path: "/messages", icon: RiMessage3Line, label: "Messages" },
    { path: "/explore", icon: RiCompass3Line, label: "Explore" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 glass-card border-b border-[#1e1e48]">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/40">
            <RiFireLine className="text-white text-lg" />
          </div>
          <span className="font-bold text-lg gradient-text hidden sm:block">Nexus</span>
        </div>

        {/* Search */}
        <div className={`relative flex-1 max-w-xs transition-all duration-200 ${searchFocused ? "max-w-sm" : ""}`}>
          <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5880] text-sm pointer-events-none" />
          <input
            type="text"
            placeholder="Search Nexus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && navigate("/explore")}
            className="w-full bg-[#1a1a40] border border-[#252550] text-[#eeeeff] placeholder-[#5a5880] text-sm rounded-xl pl-9 pr-4 py-2 outline-none focus:border-violet-600/60 focus:bg-[#1e1e48] transition-all"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = active && item.activeIcon ? item.activeIcon : item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer
                  ${active ? "text-violet-400 bg-violet-600/10" : "text-[#8888bb] hover:text-white hover:bg-[#1a1a40]"}`}
              >
                <Icon className="text-lg" />
                <span className="hidden lg:block">{item.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setCreatePostOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-lg shadow-violet-900/25"
          >
            <span className="text-base leading-none">+</span>
            <span className="hidden md:block">Post</span>
          </button>

          <button
            onClick={() => { navigate("/notifications"); markNotificationsRead(); }}
            className="relative p-2 rounded-xl text-[#8888bb] hover:text-white hover:bg-[#1a1a40] transition-all cursor-pointer"
          >
            <RiNotification3Line className="text-xl" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate(`/profile/${user.username}`)}
            className="rounded-full ring-2 ring-transparent hover:ring-violet-600/50 transition-all cursor-pointer"
          >
            <Avatar src={user.avatar} name={user.name} size="sm" online={user.online} />
          </button>

          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-xl text-[#8888bb] hover:text-white hover:bg-[#1a1a40] transition-all cursor-pointer"
          >
            <RiMenuLine className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
