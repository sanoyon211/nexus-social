import { useNavigate, useLocation } from 'react-router-dom';
import {
  RiHome5Line,
  RiHome5Fill,
  RiSearch2Line,
  RiSearch2Fill,
  RiGroup2Line,
  RiGroup2Fill,
  RiMessage3Line,
  RiMessage3Fill,
  RiUserLine,
  RiUserFill,
} from 'react-icons/ri';
import { useApp } from '../../context/AppContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, unreadNotifications } = useApp();

  const items = [
    { path: '/', icon: RiHome5Line, activeIcon: RiHome5Fill, label: 'Home' },
    {
      path: '/explore',
      icon: RiSearch2Line,
      activeIcon: RiSearch2Fill,
      label: 'Search',
    },
    {
      path: '/friends',
      icon: RiGroup2Line,
      activeIcon: RiGroup2Fill,
      label: 'Friends',
    },
    {
      path: '/messages',
      icon: RiMessage3Line,
      activeIcon: RiMessage3Fill,
      label: 'Messages',
      badge: true,
    },
    {
      path: `/profile/${user.username}`,
      match: '/profile',
      icon: RiUserLine,
      activeIcon: RiUserFill,
      label: 'Profile',
    },
  ];

  const isActive = item => {
    const matchPath = item.match || item.path;
    if (matchPath === '/') return location.pathname === '/';
    return location.pathname.startsWith(matchPath);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-card border-t border-[#1e1e48] px-2 py-2">
      <div className="flex items-center justify-around">
        {items.map(item => {
          const active = isActive(item);
          const Icon = active ? item.activeIcon : item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all cursor-pointer
                ${active ? 'text-violet-400' : 'text-[#5a5880]'}`}
            >
              {active && (
                <span className="absolute inset-0 bg-violet-600/10 rounded-2xl" />
              )}
              <Icon className="text-xl relative z-10" />
              <span
                className={`text-[10px] font-medium relative z-10 ${active ? 'text-violet-400' : 'text-[#5a5580]'}`}
              >
                {item.label}
              </span>
              {item.badge && unreadNotifications > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 bg-violet-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
