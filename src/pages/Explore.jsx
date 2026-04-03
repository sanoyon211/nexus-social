import { useState } from "react";
import {
  RiSearchLine, RiFireLine, RiHashtag, RiImageLine,
  RiVideoLine, RiArticleLine, RiGroupLine, RiCompass3Line,
} from "react-icons/ri";
import { posts, users, trendingTopics } from "../data/mockData";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Avatar from "../components/ui/Avatar";
import PostCard from "../components/feed/PostCard";

const categories = [
  { id: "all", label: "All", icon: RiCompass3Line },
  { id: "photos", label: "Photos", icon: RiImageLine },
  { id: "videos", label: "Videos", icon: RiVideoLine },
  { id: "articles", label: "Articles", icon: RiArticleLine },
  { id: "people", label: "People", icon: RiGroupLine },
];

export default function Explore() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useApp();
  const [category, setCategory] = useState("all");
  const [localSearch, setLocalSearch] = useState(searchQuery || "");

  const mediaPosts = posts.filter((p) => p.image);

  const filteredUsers = localSearch
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(localSearch.toLowerCase()) ||
          u.username.toLowerCase().includes(localSearch.toLowerCase())
      )
    : [];

  const filteredPosts = localSearch
    ? posts.filter((p) => p.content.toLowerCase().includes(localSearch.toLowerCase()))
    : posts;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Explore</h1>
        <p className="text-sm text-[#8888bb]">Discover trending content and new people</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5880] text-lg" />
        <input
          type="text"
          placeholder="Search posts, people, tags..."
          value={localSearch}
          onChange={(e) => { setLocalSearch(e.target.value); setSearchQuery(e.target.value); }}
          className="w-full bg-[#0f0f26] border border-[#1e1e48] focus:border-violet-600/50 text-[#eeeeff] placeholder-[#5a5880] text-sm rounded-2xl pl-12 pr-4 py-3.5 outline-none transition-all"
        />
      </div>

      {/* Search Results */}
      {localSearch && (
        <div className="mb-8">
          {filteredUsers.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#5a5880] uppercase tracking-wider mb-3">People</p>
              <div className="flex flex-col gap-2">
                {filteredUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => navigate(`/profile/${u.username}`)}
                    className="flex items-center gap-3 p-3 bg-[#0f0f26] border border-[#1e1e48] hover:border-violet-600/30 rounded-2xl transition-all cursor-pointer text-left"
                  >
                    <Avatar src={u.avatar} name={u.name} size="md" online={u.online} />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold text-white">{u.name}</p>
                        {u.verified && <span className="text-violet-400 text-xs">✓</span>}
                      </div>
                      <p className="text-xs text-[#5a5880]">@{u.username} · {u.followers?.toLocaleString()} followers</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#5a5880] uppercase tracking-wider mb-3">Posts</p>
              {filteredPosts.map((p) => <PostCard key={p.id} post={p} />)}
            </div>
          )}

          {filteredUsers.length === 0 && filteredPosts.length === 0 && (
            <div className="text-center py-12 text-[#5a5880]">
              <RiSearchLine className="text-4xl mx-auto mb-3 text-[#2a2a50]" />
              <p className="text-sm font-medium">No results for "{localSearch}"</p>
            </div>
          )}
        </div>
      )}

      {!localSearch && (
        <>
          {/* Trending Topics */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <RiFireLine className="text-orange-400 text-xl" />
              <h2 className="text-base font-bold text-white">Trending Topics</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {trendingTopics.map((topic, i) => (
                <button
                  key={topic.id}
                  className="relative bg-[#0f0f26] border border-[#1e1e48] hover:border-violet-600/30 rounded-2xl p-4 text-left cursor-pointer transition-all group overflow-hidden"
                >
                  <div className="absolute top-2 right-3 text-4xl font-black text-[#1a1a40] group-hover:text-[#252550] transition-colors select-none">
                    {i + 1}
                  </div>
                  {topic.hot && (
                    <span className="inline-block text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold mb-2 border border-orange-500/25">
                      🔥 HOT
                    </span>
                  )}
                  <div className="flex items-center gap-1 mb-1">
                    <RiHashtag className="text-violet-400 text-sm flex-shrink-0" />
                    <p className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors truncate">
                      {topic.tag}
                    </p>
                  </div>
                  <p className="text-xs text-[#5a5880]">{topic.posts}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer
                    ${category === cat.id
                      ? "bg-violet-600/20 text-violet-300 border border-violet-600/30"
                      : "text-[#8888bb] hover:text-white hover:bg-[#1a1a40] border border-[#1e1e48]"
                    }`}
                >
                  <Icon className="text-base" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Photo Grid */}
          {(category === "all" || category === "photos") && (
            <div className="mb-8">
              <h2 className="text-base font-bold text-white mb-4">Trending Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {mediaPosts.map((p, i) => (
                  <div
                    key={p.id}
                    className={`relative group cursor-pointer rounded-2xl overflow-hidden border border-[#1e1e48] hover:border-violet-600/40 transition-all
                      ${i === 0 ? "col-span-2" : ""}`}
                    style={{ aspectRatio: i === 0 ? "16/9" : "1/1" }}
                  >
                    <img
                      src={p.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2">
                          <Avatar src={p.user.avatar} name={p.user.name} size="xs" />
                          <span className="text-white text-xs font-medium truncate">{p.user.name}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-white/70">
                          <span>❤️ {p.likes}</span>
                          <span>💬 {p.comments.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Discover People */}
          {(category === "all" || category === "people") && (
            <div>
              <h2 className="text-base font-bold text-white mb-4">Discover People</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {users.slice(0, 4).map((u) => (
                  <button
                    key={u.id}
                    onClick={() => navigate(`/profile/${u.username}`)}
                    className="flex items-center gap-3 p-3.5 bg-[#0f0f26] border border-[#1e1e48] hover:border-violet-600/30 rounded-2xl transition-all cursor-pointer text-left group"
                  >
                    <Avatar src={u.avatar} name={u.name} size="lg" online={u.online} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
                          {u.name}
                        </p>
                        {u.verified && <span className="text-violet-400 text-xs flex-shrink-0">✓</span>}
                      </div>
                      <p className="text-xs text-[#5a5580] truncate">@{u.username}</p>
                      <p className="text-xs text-[#8888bb] mt-1 truncate">{u.bio}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
