import { useNavigate, useLocation } from "react-router-dom";
import {
  RiHome5Line, RiHome5Fill, RiUserLine, RiUserFill,
  RiMessage3Line, RiMessage3Fill, RiNotification3Line, RiNotification3Fill,
  RiCompass3Line, RiCompass3Fill, RiBookmarkLine, RiBookmarkFill,
  RiSettingsLine, RiLogoutBoxLine, RiGroup2Line, RiGroup2Fill,
  RiFlashlightLine,
} from "react-icons/ri";
import { useApp } from "../../context/AppContext";
import Avatar from "../ui/Avatar";
import { onlineFriends } from "../../data/mockData";

export default function Sidebar({ mobile = false, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, unreadNotifications, setCreatePostOpen } = useApp();

  const navItems = [
    { path: "/", label: "Home", icon: RiHome5Line, activeIcon: RiHome5Fill },
    { path: `/profile/${user.username}`, label: "Profile", icon: RiUserLine, activeIcon: RiUserFill, match: "/profile" },
    { path: "/friends", label: "Friends", icon: RiGroup2Line, activeIcon: RiGroup2Fill },
    { path: "/messages", label: "Messages", icon: RiMessage3Line, activeIcon: RiMessage3Fill },
    { path: "/notifications", label: "Notifications", icon: RiNotification3Line, activeIcon: RiNotification3Fill, badge: unreadNotifications },
    { path: "/explore", label: "Explore", icon: RiCompass3Line, activeIcon: RiCompass3Fill },
    { path: "/saved", label: "Saved", icon: RiBookmarkLine, activeIcon: RiBookmarkFill },
  ];

  const isActive = (item) => {
    const matchPath = item.match || item.path;
    if (matchPath === "/") return location.pathname === "/";
    return location.pathname.startsWith(matchPath);
  };

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <aside className={`flex flex-col h-full ${mobile ? "p-4" : "py-6 px-4"}`}>
      {/* User Card */}
      <div
        className="flex items-center gap-3 p-3 rounded-2xl bg-[#1a1a40] border border-[#252550] mb-6 cursor-pointer hover:border-violet-600/40 transition-all"
        onClick={() => handleNav(`/profile/${user.username}`)}
      >
        <Avatar src={user.avatar} name={user.name} size="md" online={user.online} />
        <div className="overflow-hidden">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            {user.verified && <span className="text-violet-400 text-xs flex-shrink-0">✓</span>}
          </div>
          <p className="text-xs text-[#5a5880] truncate">@{user.username}</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = active && item.activeIcon ? item.activeIcon : item.icon;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer w-full text-left
                ${active
                  ? "bg-violet-600/15 text-violet-300 border border-violet-600/25"
                  : "text-[#8888bb] hover:text-white hover:bg-[#1a1a40]"
                }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-violet-400 to-indigo-500 rounded-r-full" />
              )}
              <Icon className="text-lg flex-shrink-0" />
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className="ml-auto bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Create Post Button */}
      <button
        onClick={() => { setCreatePostOpen(true); if (onClose) onClose(); }}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-violet-900/30 cursor-pointer"
      >
        <RiFlashlightLine className="text-lg" />
        Create Post
      </button>

      {/* Online Friends */}
      <div className="mt-6 pt-5 border-t border-[#1e1e48]">
        <p className="text-xs font-semibold text-[#5a5880] uppercase tracking-wider mb-3 px-1">Online Now</p>
        <div className="flex flex-col gap-2">
          {onlineFriends.slice(0, 4).map((friend) => (
            <button
              key={friend.id}
              onClick={() => handleNav("/messages")}
              className="flex items-center gap-2.5 px-1.5 py-1 rounded-lg hover:bg-[#1a1a40] transition-all cursor-pointer w-full"
            >
              <Avatar src={friend.avatar} name={friend.name} size="sm" online />
              <span className="text-sm text-[#8888bb] hover:text-white transition-colors truncate">{friend.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-auto pt-4 border-t border-[#1e1e48] flex items-center justify-between">
        <button className="flex items-center gap-2 text-xs text-[#5a5880] hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-[#1a1a40]">
          <RiSettingsLine className="text-base" /> Settings
        </button>
        <button className="flex items-center gap-2 text-xs text-[#5a5580] hover:text-red-400 transition-colors cursor-pointer p-2 rounded-lg hover:bg-[#1a1a40]">
          <RiLogoutBoxLine className="text-base" /> Logout
        </button>
      </div>
    </aside>
  );
}
