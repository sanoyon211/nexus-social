import { useState } from "react";
import {
  RiHeart3Fill, RiChat1Fill, RiUserAddFill, RiAtLine,
  RiShareForwardFill, RiCheckLine, RiSettings3Line,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Avatar from "../components/ui/Avatar";

const typeConfig = {
  like: { icon: RiHeart3Fill, color: "text-red-400", bg: "bg-red-400/15" },
  comment: { icon: RiChat1Fill, color: "text-blue-400", bg: "bg-blue-400/15" },
  follow: { icon: RiUserAddFill, color: "text-violet-400", bg: "bg-violet-400/15" },
  tag: { icon: RiAtLine, color: "text-amber-400", bg: "bg-amber-400/15" },
  share: { icon: RiShareForwardFill, color: "text-emerald-400", bg: "bg-emerald-400/15" },
};

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, markNotificationsRead } = useApp();
  const [filter, setFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "like", label: "Likes" },
    { id: "comment", label: "Comments" },
    { id: "follow", label: "Follows" },
  ];

  const displayed = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);
  const unread = notifications.filter((n) => !n.read);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Notifications</h1>
          {unread.length > 0 && (
            <p className="text-sm text-[#8888bb]">
              <span className="text-violet-400 font-medium">{unread.length}</span> unread
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unread.length > 0 && (
            <button
              onClick={markNotificationsRead}
              className="flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 bg-violet-600/10 hover:bg-violet-600/20 px-3 py-2 rounded-xl border border-violet-600/25 transition-all cursor-pointer"
            >
              <RiCheckLine /> Mark all read
            </button>
          )}
          <button className="p-2 rounded-xl text-[#8888bb] hover:text-white hover:bg-[#1a1a40] transition-all cursor-pointer">
            <RiSettings3Line className="text-lg" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer
              ${filter === f.id
                ? "bg-violet-600/20 text-violet-300 border border-violet-600/30"
                : "text-[#8888bb] hover:text-white hover:bg-[#1a1a40] border border-[#1e1e48]"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification Groups */}
      {["Today", "Earlier"].map((group, gi) => {
        const groupItems = gi === 0
          ? displayed.filter((n) => !n.time.includes("Yesterday") && !n.time.includes("d ago"))
          : displayed.filter((n) => n.time.includes("Yesterday") || n.time.includes("d ago"));

        if (groupItems.length === 0) return null;

        return (
          <div key={group} className="mb-6">
            <p className="text-xs font-semibold text-[#5a5880] uppercase tracking-wider mb-3 px-1">{group}</p>
            <div className="flex flex-col gap-2">
              {groupItems.map((notif) => {
                const config = typeConfig[notif.type] || typeConfig.like;
                const Icon = config.icon;
                return (
                  <button
                    key={notif.id}
                    onClick={() => navigate(`/profile/${notif.user.username}`)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all cursor-pointer text-left w-full
                      ${!notif.read ? "bg-violet-600/8 border border-violet-600/15 hover:border-violet-600/30" : "bg-[#0f0f26] border border-[#1e1e48] hover:border-[#252550]"}`}
                  >
                    {/* Avatar + icon badge */}
                    <div className="relative flex-shrink-0">
                      <Avatar src={notif.user.avatar} name={notif.user.name} size="md" />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${config.bg} rounded-full flex items-center justify-center border border-[#0f0f26]`}>
                        <Icon className={`${config.color} text-[10px]`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#eeeeff] leading-snug">
                        <span className="font-semibold text-white hover:text-violet-300 transition-colors">
                          {notif.user.name}
                        </span>{" "}
                        {notif.content}
                      </p>
                      <p className="text-xs text-[#5a5880] mt-0.5">{notif.time}</p>
                    </div>

                    {/* Post thumbnail */}
                    {notif.postImage && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-[#1e1e48]">
                        <img src={notif.postImage} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Unread dot */}
                    {!notif.read && (
                      <span className="flex-shrink-0 w-2 h-2 bg-violet-500 rounded-full pulse-dot" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {displayed.length === 0 && (
        <div className="text-center py-16 text-[#5a5880]">
          <div className="w-16 h-16 bg-[#1a1a40] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-[#252550]">
            <RiHeart3Fill className="text-3xl text-[#2a2a50]" />
          </div>
          <p className="text-sm font-medium text-[#8888bb]">No notifications yet</p>
          <p className="text-xs mt-1">When someone interacts with you, it'll show up here</p>
        </div>
      )}
    </div>
  );
}
