import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  RiMapPinLine,
  RiGlobalLine,
  RiCalendarLine,
  RiUserAddLine,
  RiMessage3Line,
  RiMoreLine,
  RiCheckLine,
  RiGridLine,
  RiBookmarkLine,
  RiAtLine,
  RiEditLine,
  RiCamera2Line,
} from 'react-icons/ri';
import { useApp } from '../context/AppContext';
import { users } from '../data/mockData';
import { posts as allPosts } from '../data/mockData';
import PostCard from '../components/feed/PostCard';
import Avatar from '../components/ui/Avatar';

function formatCount(n) {
  if (!n) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n;
}

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useApp();

  // Find by username param, fallback to currentUser
  const foundUser = username
    ? users.find(u => u.username === username) ||
      (user.username === username ? user : null)
    : user;
  const displayUser = foundUser || user;
  const isOwn = displayUser.id === user.id;

  const [following, setFollowing] = useState(displayUser.isFollowing || false);
  const [activeTab, setActiveTab] = useState('posts');

  const userPosts = isOwn
    ? allPosts
    : allPosts.filter(p => p.user.id === displayUser.id);

  const tabs = [
    { id: 'posts', label: 'Posts', icon: RiGridLine },
    { id: 'media', label: 'Media', icon: RiCamera2Line },
    { id: 'saved', label: 'Saved', icon: RiBookmarkLine },
    { id: 'tagged', label: 'Tagged', icon: RiAtLine },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Cover Photo */}
      <div className="relative h-52 sm:h-64 bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 rounded-b-3xl overflow-hidden">
        {displayUser.coverPhoto && (
          <img
            src={displayUser.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0f26]/60" />
        {isOwn && (
          <button className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-xl hover:bg-black/60 transition-all cursor-pointer border border-white/20">
            <RiCamera2Line /> Change Cover
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 pb-0">
        <div className="relative flex items-end justify-between -mt-14 sm:-mt-16 mb-4">
          <div className="relative">
            <div className="gradient-border rounded-[22px] p-0.5">
              <img
                src={displayUser.avatar}
                alt={displayUser.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-[20px] object-cover border-2 border-[#0f0f26]"
              />
            </div>
            {isOwn && (
              <button className="absolute bottom-1 right-1 w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-violet-500 transition-all shadow-lg">
                <RiCamera2Line className="text-white text-xs" />
              </button>
            )}
            {displayUser.online && (
              <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0f0f26]" />
            )}
          </div>

          <div className="flex items-center gap-2 mb-1">
            {isOwn ? (
              <button className="flex items-center gap-2 bg-[#1a1a40] hover:bg-[#222255] text-[#eeeeff] text-sm font-medium px-4 py-2.5 rounded-xl border border-[#252550] hover:border-violet-600/40 transition-all cursor-pointer">
                <RiEditLine /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setFollowing(!following)}
                  className={`flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer
                    ${
                      following
                        ? 'bg-[#1a1a40] text-[#8888bb] border border-[#252550] hover:border-red-500/40 hover:text-red-400'
                        : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30'
                    }`}
                >
                  {following ? (
                    <>
                      <RiCheckLine /> Following
                    </>
                  ) : (
                    <>
                      <RiUserAddLine /> Follow
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate('/messages')}
                  className="flex items-center gap-2 bg-[#1a1a40] hover:bg-[#222255] text-[#eeeeff] text-sm font-medium px-4 py-2.5 rounded-xl border border-[#252550] hover:border-violet-600/40 transition-all cursor-pointer"
                >
                  <RiMessage3Line /> Message
                </button>
                <button className="p-2.5 bg-[#1a1a40] rounded-xl border border-[#252550] text-[#8888bb] hover:text-white hover:bg-[#222255] transition-all cursor-pointer">
                  <RiMoreLine className="text-lg" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Name & Bio */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white">{displayUser.name}</h1>
            {displayUser.verified && (
              <span className="text-xs text-violet-400 bg-violet-600/15 px-2 py-0.5 rounded-full font-semibold border border-violet-600/25">
                ✓ Verified
              </span>
            )}
          </div>
          <p className="text-sm text-[#8888bb] mb-3">@{displayUser.username}</p>
          {displayUser.bio && (
            <p className="text-sm text-[#ddddef] leading-relaxed mb-3 max-w-lg">
              {displayUser.bio}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#8888bb]">
            {displayUser.location && (
              <span className="flex items-center gap-1.5">
                <RiMapPinLine className="text-violet-400" />{' '}
                {displayUser.location}
              </span>
            )}
            {displayUser.website && (
              <span className="flex items-center gap-1.5 text-violet-400 hover:underline cursor-pointer">
                <RiGlobalLine /> {displayUser.website}
              </span>
            )}
            {displayUser.joinDate && (
              <span className="flex items-center gap-1.5">
                <RiCalendarLine className="text-violet-400" /> Joined{' '}
                {displayUser.joinDate}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 py-4 border-y border-[#1e1e48] mb-5">
          {[
            { label: 'Posts', value: displayUser.postsCount },
            { label: 'Followers', value: displayUser.followers },
            { label: 'Following', value: displayUser.following },
          ].map(stat => (
            <button
              key={stat.label}
              className="text-center group cursor-pointer"
            >
              <p className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                {formatCount(stat.value)}
              </p>
              <p className="text-xs text-[#5a5880] group-hover:text-[#8888bb] transition-colors">
                {stat.label}
              </p>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-5">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer
                  ${
                    activeTab === tab.id
                      ? 'bg-violet-600/15 text-violet-300 border border-violet-600/25'
                      : 'text-[#8888bb] hover:text-white hover:bg-[#1a1a40]'
                  }`}
              >
                <Icon className="text-base" />
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 pb-8">
        {activeTab === 'posts' ? (
          userPosts.length > 0 ? (
            userPosts.map(p => <PostCard key={p.id} post={p} />)
          ) : (
            <div className="text-center py-16 text-[#5a5880]">
              <RiGridLine className="text-4xl mx-auto mb-3 text-[#2a2a50]" />
              <p className="text-sm font-medium">No posts yet</p>
            </div>
          )
        ) : activeTab === 'media' ? (
          <div className="grid grid-cols-3 gap-2">
            {userPosts
              .filter(p => p.image)
              .map(p => (
                <div
                  key={p.id}
                  className="aspect-square rounded-xl overflow-hidden border border-[#1e1e48] cursor-pointer hover:opacity-80 transition-all"
                >
                  <img
                    src={p.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#5a5880]">
            <p className="text-sm">Nothing here yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
